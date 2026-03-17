
document.getElementById("equations").addEventListener("change", modifyLayout);
var chart = null;
function solve_equation(a, b)
{
let x = (-b)/a;
return x;
};


function poldeg3(a, b, c, d) {
    let p = (3*a*c - b**2) / (3*a**2);
    let q = (2*b**3 - 9*a*b*c + 27*a**2*d) / (27*a**3);

    let delta = (q/2)**2 + (p/3)**3;

    let x1, x2, x3;

    



let dataPoints = [];
for (let x = -10; x <= 10; x += 0.001) {
    let y = a*x**3 + b*x**2 + c*x + d;
    dataPoints.push({ x: x, y: y });
}


var ctx = document.getElementById("myChart").getContext('2d');
if (chart){chart.destroy();};
chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'f(x)',
                data: dataPoints,
                borderColor: 'blue',
                fill: false,
                pointRadius: 0
            }
            
        ]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});
if (delta >= 0) {
        let u = Math.cbrt(-q/2 + Math.sqrt(delta));
        let v = Math.cbrt(-q/2 - Math.sqrt(delta));
        x1 = u + v - b/(3*a);
        return [x1];
    } else {
        let r = Math.sqrt(-(p**3)/27);
        let phi = Math.acos(-q/(2*r));
        let m = 2 * Math.sqrt(-p/3);

        x1 = m * Math.cos(phi/3) - b/(3*a);
        x2 = m * Math.cos((phi + 2*Math.PI)/3) - b/(3*a);
        x3 = m * Math.cos((phi + 4*Math.PI)/3) - b/(3*a);

        return [x1, x2, x3];
    }
};

function CalculateQuadraticx1(a, b, c, decide)
{
    let x1 = (-b + Math.sqrt(decide)) / (2*a);
    return x1
};

function generateData(func, i1, i2, xValues, yValues, step = 1) {
    for (let x = i1; x <= i2; x += step) {
        xValues.push(x);
        yValues.push(func(x));
    }
}

function CalculateQuadraticx2(a, b, c, decide)
{
    let x2 = (-b - Math.sqrt(decide)) / (2*a);
    return x2
};

function Calculate(){
	let aA = Number(document.getElementById("param3").value);
	let bB = Number(document.getElementById("param2").value);
	let cC = Number(document.getElementById("param1").value);
	let dD = Number(document.getElementById("cons").value);
	
	if (aA==0){

	if(bB==0){

			let a = cC;
			let b = dD;
			
			if(a == 0)
			{
			document.getElementById("sol").innerText = "No zeros. The function is constant.";
			}
			else
			{
			let solution = solve_equation(a, b);

			
			document.getElementById("sol").innerText = solution;
			}

			var xValues = [];
			var yValues = [];
			for(var x = -10; x <= 10; x = x + 1){
			xValues.push(x);
			yValues.push(a*x + b);
				};

				if (chart){chart.destroy();};
			
			chart = new Chart(document.getElementById("myChart"), {
			type: "line",
			data: {
			labels: xValues,
			datasets: [{
			fill: false,
			data: yValues
			}]
			},
			options: {
			legend: {display: false}
			}
			});

					}
	else{
	var a = bB;
	var b = cC;
	var c = dD;
	var decide;
	var x1;
	var x2;

	

	decide = Math.pow(b, 2) - (4*a*c);

	if(decide < 0)
	{
	    document.getElementById("sol").innerText = "It is a complex root. We cannot calculate such yet.";
	}

	else if(decide >= 0)
	{
	    x1 = CalculateQuadraticx1(a, b, c, decide);
	    x2 = CalculateQuadraticx2(a, b, c, decide);

	    document.getElementById("sol").innerText = "x1: "+x1+" x2: "+ x2;

	}




	const xValues = [];
	const yValues = [];

	if(typeof x1 !== 'undefined')
	{ 
	    generateData(x => a*x*x + b*x + c, x2-3, x1+3, xValues, yValues);

	}
	else
	{
	    generateData(x => a*x*x + b*x + c, -10, 10, xValues, yValues);
	}
	if (chart){chart.destroy();};
	chart = new Chart(document.getElementById("myChart"), {

	    type: "line",
	    data: {
	        labels: xValues,

	        datasets: [{
	            fill: false,
	            pointRadius: 1,
	            borderColor: "rgba(255,0,0,0.5)",
	            data: yValues
	        }]
	    },
	    options: {
	        legend: {display: false},
	        title: {
	            display: true,
	            text: "f(x) = " + a + "*x^2 + " + b + "*x + " + c,
	            fontSize: 16
	        }
	    }
	} );
					};

		


	

				}else{

					let sol = poldeg3(aA, bB, cC, dD);
					if (sol.length == 3){
						document.getElementById("sol").innerText = "x1: " + sol[0] + " x2: "+sol[1]+" x3: "+sol[2];
				}else{
					document.getElementById("sol").innerText = "x: " + sol[0] ;
				};
					



			};
			};




function modifyLayout(){

let option = Number(document.getElementById("equations").value);

switch(option){
case 1:
  document.getElementById("param2").disabled = true;
  document.getElementById("param3").disabled = true;
  document.getElementById("param2").value = 0;
  document.getElementById("param3").value = 0;
  break;

case 2:
  document.getElementById("param2").disabled = false;
  document.getElementById("param3").disabled = true;
  document.getElementById("param3").value = 0;
  break;

case 3:
  document.getElementById("param2").disabled = false;
  document.getElementById("param3").disabled = false;
  break;
}

}

modifyLayout();