function consumirApi() {
    document.getElementById('endPoint').value="https://www.datos.gov.co/resource/2pnw-mmge.json?c_d_dep=15"
    var endPoint = document.getElementById('endPoint').value;
    fetch("https://www.datos.gov.co/resource/2pnw-mmge.json?c_d_dep=15")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var siembra = [];
            var municipio = [];

            for (var i = 0; i < data.length; i++) {
                municipio.push(data[i].municipio);
                siembra.push(data[i].rea_sembrada_ha);
            }

            var grafica = [
                {
                    x: municipio,
                    y: siembra,
                    type: 'bar'
                }
            ];
            var layout = {
                title: 'Area de siembra por Municipio',
                xaxis: {
                  title: '',
                  showgrid: true,
                  zeroline: false
                },
                yaxis: {
                  title: 'Area de Siembra Hectareas',
                  showline: false
                }
              };
            Plotly.newPlot('myDiv', grafica, layout); // Pasar 'grafica' en lugar de 'data'
            
        })
        .catch(function (error) {
            console.log('Error: ' + error);
        });
}
function consumirApiPoblacion() {
    document.getElementById('endPointPoblacion').value = "https://restcountries.com/v3.1/all";
    var endPoint = document.getElementById('endPointPoblacion').value;

    var continentSelect = document.getElementById('continentSelect');
    var selectedContinent = continentSelect.options[continentSelect.selectedIndex].value;

    fetch(endPoint)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var poblacion = [];
            var pais = [];
            var colores = [];
            var coloresPorContinente = {
                "Africa": "orange",
                "Asia": "red",
                "Europe": "blue",
                "North America": "purple",
                "Oceania": "green",
                "South America": "yellow"
            };

            for (var i = 0; i < data.length; i++) {
                if (data[i].continents.includes(selectedContinent)) {
                    poblacion.push(data[i].population);
                    pais.push(data[i].name.common);
                    colores.push(coloresPorContinente[selectedContinent]);
                }
            }

            var grafica = [{
                x: pais,
                y: poblacion,
                type: 'bar',
                marker: {
                    color: colores
                }
            }];
            var layout = {
                title: 'Población por país en ' + selectedContinent,
                xaxis: {
                    title: 'País',
                    showgrid: true,
                    zeroline: false
                },
                yaxis: {
                    title: 'Población',
                    showline: false
                }
            };
                       Plotly.newPlot('myDivPoblacion', grafica, layout);
        })
        .catch(function(error) {
            console.log('Error: ' + error);
        });
}

function consumirApiUsuarios2() {
    var dominioCount = {};
    var totalusuarios=0;
    fetch("http://localhost:5000/users")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
              data.users.forEach(function(user) {
                var domain = user.email.split('@')[1];
                if (dominioCount[domain]) {
                    dominioCount[domain]++;
                } else {
                    dominioCount[domain] = 1;
                }
            });

            var dominio = Object.keys(dominioCount);
            var usuarios = Object.values(dominioCount);

            var grafica = [{
                x: dominio,
                y: usuarios,
                type: 'bar'
            }];

            var layout = {
                title: 'Conteo de Usuarios por Dominio - Total de Usuarios: ' + data.users.length ,
                xaxis: {
                    title: 'Dominio',
                    showgrid: true,
                    zeroline: false
                },
                yaxis: {
                    title: 'Usuarios',
                    showline: false
                }
            };

            Plotly.newPlot('myDivDominios', grafica, layout);
            
        })
        .catch(function (error) {
            console.log('Error: ' + error);
        });
}
function consumirApiUsuarios() {
    var dominioCount = {};
    var passwordLengthCount = {}; 
    var totalusuarios = 0;
    
    fetch("http://localhost:5000/users")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.users.forEach(function(user) {
                var domain = user.email.split('@')[1];
                if (dominioCount[domain]) {
                    dominioCount[domain]++;
                } else {
                    dominioCount[domain] = 1;
                }
                
                var passwordLength = user.password.length;
                if (passwordLengthCount[passwordLength]) {
                    passwordLengthCount[passwordLength]++;
                } else {
                    passwordLengthCount[passwordLength] = 1;
                }
            });

            var dominio = Object.keys(dominioCount);
            var usuarios = Object.values(dominioCount);
            
            var passwordLengths = Object.keys(passwordLengthCount);
            var passwordCounts = Object.values(passwordLengthCount);
            
            var graficaDominio = [{
                x: dominio,
                y: usuarios,
                type: 'bar',
                name: 'Usuarios por Dominio'
            }];
            
            
            var graficaContrasenas = [{
                x: passwordLengths,
                y: passwordCounts,
                type: 'bar',
                name: 'Longitud de Contraseñas'
            }];

            var layoutDominio = {
                title: 'Conteo de Usuarios por Dominio - Total de Usuarios: ' + data.users.length,
                xaxis: {
                    title: 'Dominio',
                    showgrid: true,
                    zeroline: false
                },
                yaxis: {
                    title: 'Usuarios',
                    showline: false
                }
            };
            
            var layoutContrasenas = {
                title: 'Longitud de Contraseñas de Usuarios',
                xaxis: {
                    title: 'Longitud de Contraseña',
                    showgrid: true,
                    zeroline: false
                },
                yaxis: {
                    title: 'Número de Usuarios',
                    showline: false
                }
            };

            Plotly.newPlot('myDivDominios', graficaDominio, layoutDominio);
            Plotly.newPlot('myDivContrasenas', graficaContrasenas, layoutContrasenas);
            
        })
        .catch(function(error) {
            console.log('Error: ' + error);
        });
}

 

     
