document.addEventListener("DOMContentLoaded", function () {
  // Captura de elementos
  const inicioFecha = document.getElementById('inicioFecha');
  const finFecha = document.getElementById('finFecha');
  const diffFechas = document.getElementById('diffFechas');

  // Datos fijos
  const datosFijos = {
    diasTrab: 30,
    salBasDia: 50.720,
    hrsExt: 12.91,
    hrsNoct: 3.06,
    fest: 22.90,
    dietCot: 8.84,
    DietFraPlz: 13.61,
    devCndPrcpt: 8.26,
    qbrMnd: 1.33,
    hrsEspr: 4.38,
    proPgsExtr: 380.40,
    dducContComu: 0.0470,
    dducMei: 0.0013,
    dducForma: 0.0010,
    dducDesemp: 0.0155,
    dducCotiHsEx: 0.0470,
  }

  // Selecciona todos los fieldset de cada semana
  const fieldsets = document.querySelectorAll(".fieldSemana");

  // Funcion Calcula Rango Dias Nomina
  function calculaRangoDias(inicio, fin) {
    const diffTiempo = new Date(fin) - new Date(inicio);
    return Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
  }

  // Funcion Actualiza Rango Dias Nomina
  function actualizaRangoDias() {
    if (inicioFecha.value && finFecha.value) {
      diffFechas.value = calculaRangoDias(inicioFecha.value, finFecha.value);
    }
  }

  // Actualizar Rango Dias Nomina
  inicioFecha.addEventListener('change', actualizaRangoDias);
  finFecha.addEventListener('change', actualizaRangoDias);

  // Inputs de totales
  const totales = {
    hrsExt: document.getElementById("totHrsExt"),
    hrsNoct: document.getElementById("totHrsNoct"),
    festivos: document.getElementById("totFestivos"),
    dietas: document.getElementById("totDietas"),
    dietFuerPla: document.getElementById("totDietFuerPla"),
    plusConPerc: document.getElementById("totPlusConPerc"),
    plusQbrMnd: document.getElementById("totPlusQbrMnd"),
    hrsEspr: document.getElementById("totHrsEspera"),
  };

  //Inputs de Bases y Totales
  const basesTotales = {
    remuTotal: document.getElementById('remuTotal'),
    proPgsExtr: document.getElementById('proPgsExtr'),
    baseSS: document.getElementById('baseSS'),
    baseAtyDes: document.getElementById('baseAtyDes'),
    baseIRPF: document.getElementById('baseIRPF'),
    totDev: document.getElementById('totDev'),
    totDeduc: document.getElementById('totDeduc'),
  }

  const ajustes = {
    ajstIRPF: document.getElementById('ajstIRPF'),
    ajstHrsExtrRsto: document.getElementById('ajstHrsExtrRsto'),
  }

  // Función para actualizar los totales
  function actualizarTotales() {
      // Inicializamos sumas para cada tipo de dato
      const sumas = {
        hrsExt: 0,
        hrsNoct: 0,
        festivos: 0,
        dietas: 0,
        dietFuerPla: 0,
        plusConPerc: 0,
        plusQbrMnd: 0,
        hrsEspr: 0,
      };

      // Recorremos cada fieldset (cada semana)
      fieldsets.forEach(semana => {
          // Usamos selectores de atributo para encontrar el input cuyo id empieza con el nombre base
          const hrsExtInput = semana.querySelector("input[id^='hrsExt']");
          const hrsNoctInput = semana.querySelector("input[id^='hrsNoct']");
          const festivosInput = semana.querySelector("input[id^='festivos']");
          const dietasInput = semana.querySelector("input[id^='dietas']");
          const dietFuerPlaInput = semana.querySelector("input[id^='dietFuerPla']");
          const plusConPercInput = semana.querySelector("input[id^='plusConPerc']");
          const plusQbrMndInput = semana.querySelector("input[id^='plusQbrMnd']");
          const hrsEsprInput = semana.querySelector("input[id^='hrsEspera']");

          // Sincronizar Plus Quebranto con Plus Perceptor
          if (plusConPercInput && plusQbrMndInput) {
            plusQbrMndInput.value = plusConPercInput.value;
          }

          sumas.hrsExt += parseFloat(hrsExtInput.value) || 0;
          sumas.hrsNoct += parseFloat(hrsNoctInput.value) || 0;
          sumas.festivos += parseInt(festivosInput.value) || 0;
          sumas.dietas += parseInt(dietasInput.value) || 0;
          sumas.dietFuerPla += parseInt(dietFuerPlaInput.value) || 0;
          sumas.plusConPerc += parseInt(plusConPercInput.value) || 0;
          sumas.plusQbrMnd += parseInt(plusQbrMndInput.value) || 0;
          sumas.hrsEspr += parseInt(hrsEsprInput.value) || 0;
      });

      // Actualizamos los inputs de totales
      totales.hrsExt.value = sumas.hrsExt.toFixed(2);
      totales.hrsNoct.value = sumas.hrsNoct.toFixed(2);
      totales.festivos.value = sumas.festivos;
      totales.dietas.value = sumas.dietas;
      totales.dietFuerPla.value = sumas.dietFuerPla;
      totales.plusConPerc.value = sumas.plusConPerc;
      totales.plusQbrMnd.value = sumas.plusQbrMnd;
      totales.hrsEspr.value = sumas.hrsEspr;
  }

  // Agregar event listeners a cada input en cada fieldset para actualizar totales en tiempo real
  fieldsets.forEach(semana => {
      const inputs = semana.querySelectorAll("input");
      inputs.forEach(input => {
          input.addEventListener("input", actualizarTotales);
      });
  });

  // Inicializar totales al cargar
  actualizarTotales();

  // Al enviar el formulario, capturamos los datos de totales en un objeto
  document.getElementById("formulario").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevenir que el formulario se envíe y recargue la página

      const datosTotales = {
        hrsExt: parseFloat(document.getElementById("totHrsExt").value) || 0,
        hrsNoct: parseFloat(document.getElementById("totHrsNoct").value) || 0,
        festivos: parseInt(document.getElementById("totFestivos").value) || 0,
        dietas: parseInt(document.getElementById("totDietas").value) || 0,
        dietFuerPla: parseInt(document.getElementById("totDietFuerPla").value) || 0,
        plusConPerc: parseInt(document.getElementById("totPlusConPerc").value) || 0,
        plusQbrMnd: parseInt(document.getElementById("totPlusQbrMnd").value) || 0,
        hrsEspr: parseInt(document.getElementById("totHrsEspera").value) || 0,
      };

      const devengosInputs = {
        devSalBase: document.getElementById('devSalBase'),
        devHrsExtrs: document.getElementById('devHrsExtrs'),
        devHrsNoct: document.getElementById('devHrsNoct'),
        devFest: document.getElementById('devFest'),
        devDietasCot: document.getElementById('devDietasCot'),
        devDietFraPlz: document.getElementById('devDietFraPlz'),
        devCndPrcpt: document.getElementById('devCndPrcpt'),
        devQbrMnd: document.getElementById('devQbrMnd'),
        devHrsEspera: document.getElementById('devHrsEspera'),
        devHrsExtrsRsto: document.getElementById('devHrsExtrsRsto'),
      }

      const deduccionesInputs = {
        dducContComu: document.getElementById('dducContComu'),
        dducMei: document.getElementById('dducMei'),
        dducForma: document.getElementById('dducForma'),
        dducDesemp: document.getElementById('dducDesemp'),
        dducCotiHsEx: document.getElementById('dducCotiHsEx'),
        dducIrpf: document.getElementById('dducIrpf'),
        totDeduc: document.getElementById('totDeduc')
      }

      const finalesInputs = {
        totLqd: document.getElementById('totLqd'),
        totB: document.getElementById('totB'),
      }

      //Calculos de Devengos
      // Devengo Horas Extras Resto (son las horas extras que no cotizan)
      devengosInputs.devHrsExtrsRsto.value = (parseFloat(ajustes.ajstHrsExtrRsto.value) * parseFloat(datosFijos.hrsExt)).toFixed(2);
      // Devengo Salario base
      devengosInputs.devSalBase.value = (parseFloat(datosFijos.diasTrab) * parseFloat(datosFijos.salBasDia)).toFixed(2);
      // Devengo de Tiempos de Presencia (Horas Extras):
      devengosInputs.devHrsExtrs.value = ((parseFloat(datosTotales.hrsExt) * parseFloat(datosFijos.hrsExt)) - parseFloat(devengosInputs.devHrsExtrsRsto.value)).toFixed(2);
      // Devengo de Horas Extras Nocturnas:
      devengosInputs.devHrsNoct.value = (parseFloat(datosTotales.hrsNoct) * parseFloat(datosFijos.hrsNoct)).toFixed(2);
      // Devengo Días Festivos:
      devengosInputs.devFest.value = (parseFloat(datosTotales.festivos) * parseFloat(datosFijos.fest)).toFixed(2);
      // Devengo Dietas Cotizables:
      devengosInputs.devDietasCot.value = (parseFloat(datosTotales.dietas) * parseFloat(datosFijos.dietCot)).toFixed(2);
      // Devengo Dietas Fuera Plaza:
      devengosInputs.devDietFraPlz.value = (parseFloat(datosTotales.dietFuerPla) * parseFloat(datosFijos.DietFraPlz)).toFixed(2);
      // Devengo Plus Conductor Perceptor
      devengosInputs.devCndPrcpt.value = (parseFloat(datosTotales.plusConPerc) * parseFloat(datosFijos.devCndPrcpt)).toFixed(2);
      // Devengo Plus Quebranto Moneda
      devengosInputs.devQbrMnd.value = (parseFloat(datosTotales.plusQbrMnd) * parseFloat(datosFijos.qbrMnd)).toFixed(2);
      // Devengo Horas Espera
      devengosInputs.devHrsEspera.value = (parseFloat(datosTotales.hrsEspr) * parseFloat(datosFijos.hrsEspr)).toFixed(2);
      // Remuneracion Total (Suma de devengos que cotizan a la SS menos las horas extras resto)
      basesTotales.remuTotal.value = (parseFloat(devengosInputs.devSalBase.value) + parseFloat(devengosInputs.devQbrMnd.value) + parseFloat(devengosInputs.devDietasCot.value) + parseFloat(devengosInputs.devFest.value) + parseFloat(devengosInputs.devCndPrcpt.value) + parseFloat(devengosInputs.devHrsNoct.value) + parseFloat(devengosInputs.devHrsEspera.value) + parseFloat(devengosInputs.devHrsExtrs.value)).toFixed(2);

      // Bases y Totales
      // ProRateo Pagas Extras Mensuales
      basesTotales.proPgsExtr.value = (parseFloat(datosFijos.proPgsExtr)).toFixed(2);
      basesTotales.baseSS.value = (parseFloat(basesTotales.remuTotal.value) + parseFloat(basesTotales.proPgsExtr.value)).toFixed(2);
      basesTotales.baseAtyDes.value = (parseFloat(basesTotales.baseSS.value) + parseFloat(devengosInputs.devHrsExtrsRsto.value)).toFixed(2);
      basesTotales.totDev.value = (parseFloat(basesTotales.remuTotal.value) + parseFloat(devengosInputs.devHrsExtrsRsto.value)).toFixed(2);
      basesTotales.baseIRPF.value = (parseFloat(basesTotales.totDev.value)).toFixed(2);

      // Calculos de Deducciones
      // Deduccion Contingencias Comunes
      deduccionesInputs.dducContComu.value = (parseFloat(datosFijos.dducContComu) * basesTotales.baseSS.value).toFixed(2);
      // Deduccion MEI
      deduccionesInputs.dducMei.value = (parseFloat(datosFijos.dducMei) * basesTotales.baseSS.value).toFixed(2);
      // Deduccion Formacion
      deduccionesInputs.dducForma.value = (parseFloat(datosFijos.dducForma) * basesTotales.baseAtyDes.value).toFixed(2);
      // Deduccion Desempleo
      deduccionesInputs.dducDesemp.value = (parseFloat(datosFijos.dducDesemp) * basesTotales.baseAtyDes.value).toFixed(2);
      // Deduccion Cotizacion Horas Extras Resto
      deduccionesInputs.dducCotiHsEx.value = (parseFloat(datosFijos.dducCotiHsEx) * devengosInputs.devHrsExtrsRsto.value).toFixed(2);
      // Deduccion Cotizacion IRPF
      deduccionesInputs.dducIrpf.value = ((parseFloat(ajustes.ajstIRPF.value) / 100) * parseFloat(basesTotales.baseIRPF.value)).toFixed(2);
      // Calculo total de Deducciones
      deduccionesInputs.totDeduc.value = (parseFloat(deduccionesInputs.dducContComu.value) + parseFloat(deduccionesInputs.dducCotiHsEx.value) + parseFloat(deduccionesInputs.dducDesemp.value) + parseFloat(deduccionesInputs.dducForma.value) + parseFloat(deduccionesInputs.dducIrpf.value) + parseFloat(deduccionesInputs.dducMei.value)).toFixed(2);

      // Calculos Finales
      finalesInputs.totLqd.value = (parseFloat(basesTotales.totDev.value) - parseFloat(deduccionesInputs.totDeduc.value)).toFixed(2);
      finalesInputs.totB.value = parseFloat(devengosInputs.devDietFraPlz.value).toFixed(2);



  });

  // Botón Reset para recargar la página y reiniciar valores
  document.getElementById("btnReset").addEventListener("click", function () {
      location.reload();
  });
});