
document.getElementById("equations").addEventListener("change", modifyLayout);
var chart = null;
function solve_equation(a, b)
{
let x = (-b)/a;
return x;
};


function poldeg3(a, b, c, d) {
	let solutions = [];
    let p = (3*a*c - b**2) / (3*a**2);

    let q = (2*b**3 - 9*a*b*c + 27*a**2*d) / (27*a**3);

    let delta = (q/2)**2 + (p/3)**3;

    let x1, x2, x3;
    const e = 0.001;
    if (e < delta) {
    	
        let u = Math.cbrt(-q/2 + Math.sqrt(delta));
        let v = Math.cbrt(-q/2 - Math.sqrt(delta));
        x1 = u + v - b/(3*a);
 		
        solutions =  [x1];
    } else if (0<delta || delta>-e) {

    let u = Math.cbrt(-q/2);

    x1 = 2*u - b / (3*a);
    x2 = -u - b / (3*a);    
    solutions = [x1, x2];

}else {

        let r = Math.sqrt(-(p**3)/27);
        let phi = Math.acos(-q/(2*r));
        let m = 2 * Math.sqrt(-p/3);

        x1 = m * Math.cos(phi/3) - b/(3*a);
        x2 = m * Math.cos((phi + 2*Math.PI)/3) - b/(3*a);
        x3 = m * Math.cos((phi + 4*Math.PI)/3) - b/(3*a);

        solutions = [x1, x2, x3];
    }


let zeroPoints = solutions.map(x => ({ x: x, y: 0 }));
solutions.sort();

let dataPoints = [];
for (let x = (-1) * Math.sqrt((Math.round(solutions[0] + 5)*2)**2); x <= Math.sqrt((Math.round(solutions[solutions.length-1] + 5)*2)**2); x += 1) {
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
            },
             {
        label: 'Zéros',
        data: zeroPoints,
        backgroundColor: 'red',
        borderColor: 'red',
        pointRadius: 5,
        showLine: false
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
return solutions
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
	const numberOfDecimals = 10000;
	let aA = Number(document.getElementById("param3").value);
	let bB = Number(document.getElementById("param2").value);
	let cC = Number(document.getElementById("param1").value);
	let dD = Number(document.getElementById("cons").value);
	document.getElementById("sol").innerText = "";
	document.getElementById("last_step").innerText = "";
	if (aA==0){

	if(bB==0){

			let a = cC;
			let b = dD;
			
			if(a == 0)
			{
			document.getElementById("sol").innerText = "No zeros. The function is constant.";
			let solution = 0;
						}
			else
			{
			let solution = solve_equation(a, b);
			document.getElementById("last_step").innerText="(-b)/a = "+ "(-" +b +")/" + a + "=" + solution;
			
			}

			var xValues = [];
			var yValues = [];
			for(var x = Math.abs(Math.round(solution))*(-2) - 5; x <= Math.abs(Math.round(solution))*2+5; x = x + 1){
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
	    document.getElementById("sol").innerText = "On ne peut pas encore calculer ce zéro. C'est une racine complexe.";
		
	}

	else if(decide >= 0)
	{
	    x1 = CalculateQuadraticx1(a, b, c, decide);
	    x2 = CalculateQuadraticx2(a, b, c, decide);

	    document.getElementById("sol").innerText = "x1: "+(Math.round(x1*numberOfDecimals)/numberOfDecimals)+" x2: "+ (Math.round(x2*numberOfDecimals)/numberOfDecimals);
	    document.getElementById("last_step").innerText="((-1)*b +- Sqrt(delta))/2*a = ((-1)*"+b+"+-Sqrt("+decide+"))/2*"+a;
	}




	const xValues = [];
	const yValues = [];

	if(typeof x1 !== 'undefined')
	{ 
	    generateData(x => a*x*x + b*x + c, Math.round(x2)-3, Math.round(x1)+3, xValues, yValues);

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
					document.getElementById("last_step").innerText = "";
					if (sol.length == 3){
						document.getElementById("sol").innerText = "x1: " + (Math.round(sol[0]*numberOfDecimals)/numberOfDecimals)
						 + " x2: "+(Math.round(sol[1]*numberOfDecimals)/numberOfDecimals)+" x3: "+(Math.round(sol[2]*numberOfDecimals)/numberOfDecimals);
				}else if (sol.length == 2){document.getElementById("sol").innerText = "x1: " + (Math.round(sol[0]*numberOfDecimals)/numberOfDecimals)
				 + " x2: "+(Math.round(sol[1]*numberOfDecimals)/numberOfDecimals);}
				else{
					document.getElementById("sol").innerText = "x: " + (Math.round(sol[0]*numberOfDecimals)/numberOfDecimals) ;
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
