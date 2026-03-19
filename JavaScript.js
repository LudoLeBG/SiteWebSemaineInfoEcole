
document.getElementById("equations").addEventListener("change", modifyLayout);
var chart = null;
function solve_equation(a, b)
{
let x = (-b)/a;
return x;
};

function Graphique(solutions, a=0, b=0, c=0, d=0){

		let zeroPoints = solutions.map(x => ({ x: x, y: 0 }));
		solutions.sort((a, b) => a - b);

		let dataPoints = [];
		let diff = Math.abs(solutions[solutions.length-1] - solutions[0]);
		if(diff !== 0){
			let ordre_De_grandeur = Math.abs(Math.floor(Math.log10(diff)));
		let borne_sup = 0;
		let borne_inf = 0;
		alert(ordre_De_grandeur);
		for(let bsup = solutions[solutions.length-1]; Math.abs(a*bsup**3 + b*bsup**2 + c*bsup + d) < 10**ordre_De_grandeur; bsup+=(10**((-1) * (ordre_De_grandeur+3)))) {
			borne_sup = bsup;

		};

		alert(borne_sup);
		for(let binf = solutions[0]; Math.abs(a*binf**3 + b*binf**2 + c*binf + d) < 10**ordre_De_grandeur; binf-=(10**((-1) * (ordre_De_grandeur+3))) ){
			borne_inf = binf;
		};

		
		
		alert(borne_inf );
		let step = ordre_De_grandeur + 2;
		for (let x = borne_inf; x < borne_sup; x += (10**((-1) * (ordre_De_grandeur+3)))) {
    		let y = a*x**3 + b*x**2 + c*x + d;
    		dataPoints.push({ x: x, y: y });
			};
		}else{
			for (let x = -50; x < 50; x += 0.001) {
    		let y = a*x**3 + b*x**2 + c*x + d;
    		dataPoints.push({ x: x, y: y });
			}
		};
		


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

};

function poldeg3(a, b, c, d) {
	let solutions = [];
    let p = (3*a*c - b**2) / (3*a**2);

    let q = (2*b**3 - 9*a*b*c + 27*a**2*d) / (27*a**3);

    let delta = (q/2)**2 + (p/3)**3;

    let x1, x2, x3;
    const e = 0.00000000001;
    if (e < delta) {
    	
        let u = Math.cbrt(-q/2 + Math.sqrt(delta));
        let v = Math.cbrt(-q/2 - Math.sqrt(delta));
        x1 = u + v - b/(3*a);
 		
        solutions =  [x1];
    } else if (delta>-e) {

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
	document.getElementById("sol").innerText = "";
	document.getElementById("last_step").innerText="";
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
			let solution = [solve_equation(a, b)];
			document.getElementById("last_step").innerText="(-b)/a = "+ "(-" +b +")/" + a + "=" + solution[0];
			Graphique(solution, aA, bB, cC, dD);
			
			}

			

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
	    let solutions = [0, 0]
	    Graphique(solutions, aA, bB, cC, dD);
	}

	else if(decide >= 0)
	{
	    x1 = CalculateQuadraticx1(a, b, c, decide);
	    x2 = CalculateQuadraticx2(a, b, c, decide);
	    let solutions = [x1, x2];
	    Graphique(solutions, aA, bB, cC, dD);
	    document.getElementById("sol").innerText = "x1: "+(Math.round(x1*numberOfDecimals)/numberOfDecimals)+" x2: "+ (Math.round(x2*numberOfDecimals)/numberOfDecimals);
	    document.getElementById("last_step").innerText="((-1)*b +- Sqrt(delta))/2*a = ((-1)*"+b+"+-Sqrt("+decide+"))/2*"+a;
	}




	
					};

		


	

				}else{

					let sol = poldeg3(aA, bB, cC, dD);
					Graphique(sol, aA, bB, cC, dD);
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
