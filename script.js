
document.addEventListener('DOMContentLoaded', () => {
  // Captura de elementos del Formulario
  const $form = document.getElementById('payrollForm');
  const $inicioFecha = document.getElementById('inicioFecha');
  const $finFecha = document.getElementById('finFecha');
  const $diasTrabajados = document.getElementById('diasTrabajados');

  // Captura de elementos Zona Variables Fijas
  const $salarioBaseDia = document.getElementById('salarioBaseDia');
  const $horaExtra = document.getElementById('horaExtra');
  const $horaNocturna = document.getElementById('horaNocturna');
  const $diaFestivo = document.getElementById('diaFestivo');
  const $dieta = document.getElementById('dieta');
  const $dietaFueraPlaza = document.getElementById('dietaFueraPlaza');
  const $plusPerceptor = document.getElementById('plusPerceptor');
  const $plusQuebranto = document.getElementById('plusQuebranto');
  const $ppExtras = document.getElementById('ppExtras');
  const $ajusteIRPF = document.getElementById('ajusteIRPF');

  // Captura elementos Zona Recuento Mensual
  const $totalHorasExtras = document.getElementById('totalHorasExtras');
  const $totalHorasNocturnas = document.getElementById('totalHorasNocturnas');
  const $totalFestivos = document.getElementById('totalFestivos');
  const $totalDietas = document.getElementById('totalDietas');
  const $totalDietasFueraPlaza = document.getElementById('totalDietasFueraPlaza');
  const $totalConductorPerceptor = document.getElementById('totalConductorPerceptor');
  const $totalQuebrantoMoneda = document.getElementById('totalQuebrantoMoneda');

  // Captura elementos Zona Devengos
  const $salarioBaseDevengado = document.getElementById('salarioBaseDevengado');
  const $devengosHorasExtras = document.getElementById('devengosHorasExtras');
  const $devengosHorasNocturnas = document.getElementById('devengosHorasNocturnas');
  const $devengosFestivos = document.getElementById('devengosFestivos');
  const $devengosDietas = document.getElementById('devengosDietas');
  const $devengosDietasFueraPlaza = document.getElementById('devengosDietasFueraPlaza');
  const $devengosConductorPerceptor = document.getElementById('devengosConductorPerceptor');
  const $devengosQuebrantoMoneda = document.getElementById('devengosQuebrantoMoneda');
  const $totalDevengado = document.getElementById('totalDevengado');
  const $remuTotal = document.getElementById('remuTotal');
  const $devengoBaseAtyDes = document.getElementById('devengoBaseAtyDes');
  const $devengoBaseSS = document.getElementById('devengoBaseSS');
  const $devengoBaseIRPF = document.getElementById('devengoBaseIRPF');

  // Captura elementos Zona Deducciones
  const $deduccContComu = document.getElementById('deduccContComu');
  const $deduccMei = document.getElementById('deduccMei');
  const $deduccAtEp = document.getElementById('deduccAtEp');
  const $deduccDesemp = document.getElementById('deduccDesemp');
  const $deduccCotiHsEx = document.getElementById('deduccCotiHsEx');
  const $deduccIrpf = document.getElementById('deduccIrpf');
  const $deduccTotal = document.getElementById('deduccTotal');

  // Captura elementos Zona Liquido a Percibir
  const $totalLiquido = document.getElementById('totalLiquido');
  
  
  
  

  // Conversion a float y redondeo a 2 decimales
  const preciosFijos = {
    salarioBaseDia: parseFloat($salarioBaseDia.parentElement.dataset.precio).toFixed(2),
    horaExtra: parseFloat($horaExtra.parentElement.dataset.precio).toFixed(2),
    horaNocturna: parseFloat($horaNocturna.parentElement.dataset.precio).toFixed(2),
    diaFestivo: parseFloat($diaFestivo.parentElement.dataset.precio).toFixed(2),
    dieta: parseFloat($dieta.parentElement.dataset.precio).toFixed(2),
    dietaFueraPlaza: parseFloat($dietaFueraPlaza.parentElement.dataset.precio).toFixed(2),
    plusPerceptor: parseFloat($plusPerceptor.parentElement.dataset.precio).toFixed(4),
    plusQuebranto: parseFloat($plusQuebranto.parentElement.dataset.precio).toFixed(2),
    ppExtras: parseFloat($ppExtras.parentElement.dataset.precio).toFixed(2),
    deduccContComu: parseFloat($deduccContComu.parentElement.dataset.precio),
    deduccMei: parseFloat($deduccMei.parentElement.dataset.precio),
    deduccAtEp: parseFloat($deduccAtEp.parentElement.dataset.precio),
    deduccDesemp: parseFloat($deduccDesemp.parentElement.dataset.precio),
    deduccCotiHsEx: parseFloat($deduccCotiHsEx.parentElement.dataset.precio),
  };

  // Asignación de valores a los inputs Zona Variables Fijas
  $salarioBaseDia.value = preciosFijos.salarioBaseDia;
  $horaExtra.value = preciosFijos.horaExtra;
  $horaNocturna.value = preciosFijos.horaNocturna;
  $diaFestivo.value = preciosFijos.diaFestivo;
  $dieta.value = preciosFijos.dieta;
  $dietaFueraPlaza.value = preciosFijos.dietaFueraPlaza;
  $plusPerceptor.value = preciosFijos.plusPerceptor;
  $plusQuebranto.value = preciosFijos.plusQuebranto;
  $ppExtras.value = preciosFijos.ppExtras;


  // Funcion Calcula Dias Trabajados
  function calculaDiasTrabajados(inicio, fin) {
    const diffTiempo = new Date(fin) - new Date(inicio);
    return Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
  }

  // Funcion Actualiza Dias Trabajados
  function actualizaDiasTrabajados() {
    if ($inicioFecha.value && $finFecha.value) {
      $diasTrabajados.value = calculaDiasTrabajados($inicioFecha.value, $finFecha.value);
    }
  }

  function calcularTotalesSemanas(clase) {
    return Array.from(document.querySelectorAll(`.${clase}`)).reduce((total, input) => total + parseFloat(input.value || 0), 0);
  }

  function calcularDevengos(total, precio) {
    return total * precio;
  }

  function calcularDeducciones(baseCotizacion, tipo) {
    return baseCotizacion * tipo;
  }

  $inicioFecha.addEventListener('change', actualizaDiasTrabajados);
  $finFecha.addEventListener('change', actualizaDiasTrabajados);

  // Funcion para limpiar inputs numericos
  const inputsNumericosSemanas = document.querySelectorAll('.fieldSemana input[type="number"]');
  inputsNumericosSemanas.forEach(input => {
    input.addEventListener('focus', function() {
      if (this.value === '0' && !this.dataset.modificado) {
        this.value = '';
      }
    });
    input.addEventListener('input', function() {
      this.dataset.modificado = true;
    });
  });

  $form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Calculo de Totales Semanales
    const totalHorasExtras = calcularTotalesSemanas('horasExtras');
    const totalHorasNocturnas = calcularTotalesSemanas('horasNocturnas');
    const totalFestivos = calcularTotalesSemanas('festivos');
    const totalDietas = calcularTotalesSemanas('dietas');
    const totalDietasFueraPlaza = calcularTotalesSemanas('dietasFueraPlaza');
    const totalConductorPerceptor = calcularTotalesSemanas('conductorPerceptor');
    const totalQuebrantoMoneda = calcularTotalesSemanas('quebrantoMoneda');

    // Asignación de valores a los inputs Zona Recuento Mensual
    $totalHorasExtras.value = totalHorasExtras;
    $totalHorasNocturnas.value = totalHorasNocturnas;
    $totalFestivos.value = totalFestivos;
    $totalDietas.value = totalDietas;
    $totalDietasFueraPlaza.value = totalDietasFueraPlaza;
    $totalConductorPerceptor.value = totalConductorPerceptor;
    $totalQuebrantoMoneda.value = totalQuebrantoMoneda;
    
    // Calculo de Devengos
    $salarioBaseDevengado.value = calcularDevengos($salarioBaseDia.value, $diasTrabajados.value).toFixed(2);
    $devengosHorasExtras.value = calcularDevengos(totalHorasExtras, preciosFijos.horaExtra).toFixed(2);
    $devengosHorasNocturnas.value = calcularDevengos(totalHorasNocturnas, preciosFijos.horaNocturna).toFixed(2);
    $devengosFestivos.value = calcularDevengos(totalFestivos, preciosFijos.diaFestivo).toFixed(2);
    $devengosDietas.value = calcularDevengos(totalDietas, preciosFijos.dieta).toFixed(2);
    $devengosDietasFueraPlaza.value = calcularDevengos(totalDietasFueraPlaza, preciosFijos.dietaFueraPlaza).toFixed(2);
    $devengosConductorPerceptor.value = calcularDevengos(totalConductorPerceptor, preciosFijos.plusPerceptor).toFixed(2);
    $devengosQuebrantoMoneda.value = calcularDevengos(totalQuebrantoMoneda, preciosFijos.plusQuebranto).toFixed(2);
    $totalDevengado.value = (parseFloat($salarioBaseDevengado.value) + parseFloat($devengosDietas.value) + parseFloat($devengosHorasExtras.value) + parseFloat($devengosHorasNocturnas.value) + parseFloat($devengosDietasFueraPlaza.value) + parseFloat($devengosFestivos.value) + parseFloat($devengosConductorPerceptor.value) + parseFloat($devengosQuebrantoMoneda.value)).toFixed(2);
    $remuTotal.value = (parseFloat($salarioBaseDevengado.value) + parseFloat($devengosDietas.value) + parseFloat($devengosDietasFueraPlaza.value) + parseFloat($devengosFestivos.value) + parseFloat($devengosConductorPerceptor.value) + parseFloat($devengosQuebrantoMoneda.value)).toFixed(2);
    $devengoBaseAtyDes.value = (parseFloat($totalDevengado.value) + parseFloat($ppExtras.value)).toFixed(2);
    $devengoBaseSS.value = parseFloat($devengoBaseAtyDes.value).toFixed(2) - parseFloat($devengosHorasExtras.value).toFixed(2);
    $devengoBaseIRPF.value = parseFloat($totalDevengado.value).toFixed(2);

    // Calculo de Deducciones
    $deduccContComu.value = calcularDeducciones($devengoBaseSS.value, preciosFijos.deduccContComu).toFixed(2);
    $deduccMei.value = calcularDeducciones($devengoBaseSS.value, preciosFijos.deduccMei).toFixed(2);
    $deduccAtEp.value = calcularDeducciones($devengoBaseSS.value, preciosFijos.deduccAtEp).toFixed(2);
    $deduccDesemp.value = calcularDeducciones($devengoBaseSS.value, preciosFijos.deduccDesemp).toFixed(2);
    $deduccCotiHsEx.value = calcularDeducciones($devengosHorasExtras.value, preciosFijos.deduccCotiHsEx).toFixed(2);
    $deduccIrpf.value = calcularDeducciones($totalDevengado.value, ($ajusteIRPF.value / 100)).toFixed(2);
    $deduccTotal.value = (parseFloat($deduccContComu.value) + parseFloat($deduccMei.value) + parseFloat($deduccAtEp.value) + parseFloat($deduccDesemp.value) + parseFloat($deduccCotiHsEx.value) + parseFloat($deduccIrpf.value)).toFixed(2);

    // Calculo de Liquido a Percibir
    const liquido = parseFloat($totalDevengado.value) - parseFloat($deduccTotal.value);
    const liquidoFormateado = liquido.toLocaleString('es-ES');
    const liquidoConEuro = liquidoFormateado + '€';
    $totalLiquido.value = liquidoConEuro;

  });
});