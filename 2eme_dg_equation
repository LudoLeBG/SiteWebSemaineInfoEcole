function CalculateQuadraticx1(a, b,c)
{
    x1 = (-b + Math.sqrt(decide)) / (2*a);
    return x1
}

function CalculateQuadraticx2(a, b,c)
{
    x2 = (-b - Math.sqrt(decide)) / (2*a);
    return x2
}


var a;
var b;
var c;
var decide;
var x1;
var x2;

a = parseFloat(prompt("Enter the value for a: ", 0));
b = parseFloat(prompt("Enter the value for b: ", 0));
c = parseFloat(prompt("Enter the value for c: ", 0));

decide = Math.pow(b, 2) - (4*a*c);

if(decide < 0)
{
    alert("We have a complex root. \n This program will terminate");
}

else if(decide >= 0)
{
    x1 = CalculateQuadraticx1(a, b, c);
    x2 = CalculateQuadraticx2(a, b, c);

    alert("The Quadratic Equation \n x1 = " + x1 + " \n and \n x2 = " + x2);
}




const xValues = [];
const yValues = [];
if(typeof x1 !== 'undefined')
{
    generateData("Math.pow(x, 2)*a+b*x+c", x2-3, x1+3, 1);
}
else
{
    generateData("Math.pow(x, 2)*a+b*x+c", -10, 10, 1);
}
new Chart("myChart", {
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
});
function generateData(value, i1, i2, step = 1) {
    for (let x = i1; x <= i2; x += step) {
        yValues.push(eval(value));
        xValues.push(x);
    }
}
