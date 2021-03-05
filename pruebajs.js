var nodo = 0;
var lineas = 0;
var network = null;

var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {
  physics: {
    barnesHut: {
      enabled: false,
      gravitationalConstant: -2000,
      centralGravity: 0.1,
      springLength: 100,
      springConstant: 0.01,
      damping: 0.1,
    },
    repulsion: {
      centralGravity: 0.9,
      springLength: 40,
      springConstant: 0.0,
      nodeDistance: 100,
      damping: 0.0,
    },
  },
  manipulation: {
    enabled: true,
    initiallyActive: true,

    addNode: function (data, callback) {
      document.getElementById("node-operation").innerText = "Agregar Nodo";
      editNode(data, limpiarcajanodoedit, callback);
    },
    editNode: function (data, callback) {
      document.getElementById("node-operation").innerText = "Edit Nodo";
      editNode(data, cancelarnodoedi, callback);
    },
    addEdge: function (data, callback) {
      if (data.from == data.to) {
        var r = confirm("Quieres conectarlo asi mismo?");
        if (r != true) {
          callback(null);
          return;
        }
      }
      document.getElementById("edge-operation").innerText = "Agregar Linea";
      editarLinea(data, callback);
    },

    editEdge: {
      editWithoutDrag: function (data, callback) {
        document.getElementById("edge-operation").innerText = "Editar";
        editarLinea(data, callback);
      },
    },
  },
  nodes: {
    shape: "triangle",
    color: "#ff9a76",
    font: {
      color: "#333333",
      size: 19,
    },
  },
  edges: {
    arrows: {
      to: {
        enabled: true,
        type: "triangle",
        fontSize: 20,
        color: "#ffffff",
      },
    },
  },
};

network = new vis.Network(container, data, options);

function editNode(data, cancelAction, callback) {
  data.id = nodo++;
  document.getElementById("nnombre").value = data.label;
  document.getElementById("nguardar").onclick = nododatos.bind(
    this,
    data,
    callback
  );
  document.getElementById("ncancelar").onclick = cancelAction.bind(
    this,
    callback
  );
  document.getElementById("node-popUp").style.display = "block";
}

function limpiarcajanodoedit() {
  document.getElementById("nguardar").onclick = null;
  document.getElementById("ncancelar").onclick = null;
  document.getElementById("node-popUp").style.display = "none";
}

function cancelarnodoedi(callback) {
  limpiarcajanodoedit();
  callback(null);
}

function nododatos(data, callback) {
  data.label = document.getElementById("nnombre").value;
  limpiarcajanodoedit();
  callback(data);
}

function editarLinea(data, callback) {
  document.getElementById("lnombre").value = data.label;
  document.getElementById("lguardar").onclick = guardarlinea.bind(
    this,
    data,
    callback
  );
  document.getElementById("lcancelar").onclick = cancelarlinea.bind(
    this,
    callback
  );
  document.getElementById("edge-popUp").style.display = "block";
}

function limpiarcajalineas() {
  document.getElementById("lguardar").onclick = null;
  document.getElementById("lcancelar").onclick = null;
  document.getElementById("edge-popUp").style.display = "none";
}

function cancelarlinea(callback) {
  limpiarcajalineas();
  callback(null);
}

function guardarlinea(data, callback) {
  if (typeof data.to === "object") data.to = data.to.id;
  if (typeof data.from === "object") data.from = data.from.id;
  data.label = document.getElementById("lnombre").value;
  limpiarcajalineas();
  callback(data);
}
function Matriz() {
  var nodoA = [];
  var valoresA = [];
  let c = 0;

  if (c < edges.length) {
    const n = edges.forEach((element) => {
      const nodes = element.from.toString() + "-" + element.to.toString();
      const values = element.label;
      console.log(values);
      console.log(nodes);
      nodoA.push(nodes);
      valoresA.push(values);
    });
  }
 
  c = 0;
  var matrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));
  while (c <nodoA.length) {
    var split =nodoA[c].split("-");
    matrix[parseInt(split[1])][parseInt(split[0])] = valoresA[c];
    c++;        
  }

  var Filas = [];
  var Columnas = [];

  // Suma de filas y columnas
  for (let i = 0; i < matrix.length; i++) {
      var sumaFilas = 0;
      var sumaColumnas = 0;
      for (let j = 0; j < matrix.length; j++) {
          sumaFilas += parseFloat(matrix[i][j]);
          sumaColumnas += parseFloat(matrix[j][i]);
      }
      Filas.push(sumaColumnas);
      Columnas.push(sumaFilas);
  }

  var matriz = ",";
  c = 0;
  while (c < nodes.length) {
    matriz += nodes.get(c).label + ",";
    c++;
  }
  matriz += "Suma|";

// Construir la matriz e insertar resultantes de la sumatoria
  
  for (let i = 0; i < matrix.length; i++) {
    matriz += nodes.get(i).label + ",";
    for (let j = 0; j < matrix.length; j++) {
      matriz += matrix[j][i] + ",";
      
    }
    matriz += Filas[i] + "|";
  }

  c = 0;
  matriz += "Suma,";
  while (c < Columnas.length) {
    matriz += Columnas[c] + ",";
    c++;
    
  }
 
  toMatrix(matriz);


}
const toMatrix = (matriz) => {
  let aux = Array(nodes.length +2).fill(0).map(() => Array(nodes.length +2).fill(0));

  let filas = matriz.split("|");

  for(let i=0; i<filas.length; i++){
    let columnas = filas[i].split(",");
    console.log(columnas);

    for(let j=0; j<columnas.length; j++){
      aux[i][j] = columnas[j];
    }
  }
  

  tablx(aux);
}
const tablx = (datos) =>{
  var tabla = document.getElementById("matrizFinal");

  var cuerpo = document.createElement("tbody");

  tabla.innerText = "";

  datos.forEach(function(datosFilas){
      var fila = document.createElement("tr");
    
    datosFilas.forEach(function(data){

      var celda = document.createElement("th");
  
      celda.appendChild(document.createTextNode(data));
      fila.appendChild(celda);
      
    });
    cuerpo.appendChild(fila);
  })
  
  tabla.appendChild(cuerpo);
}

function limpiar() {
  location.reload();
}
