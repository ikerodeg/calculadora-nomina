# Calculadora de Nómina

![Calculadora de Nómina](foto.jpg)

Una **herramienta moderna** para calcular el salario en función de los días trabajados, horas extras, nocturnas, festivos, dietas y plus conductor. Esta calculadora utiliza las últimas funcionalidades de HTML, CSS y JavaScript (ES6 Modules) para ofrecer una experiencia interactiva y elegante.

---

## Características

- **Interfaz intuitiva:**  
  Formulario sencillo para introducir fechas, horas y complementos.
  
- **Cálculos automáticos:**  
  - Calcula automáticamente los días trabajados a partir de la fecha de inicio y fin.
  - Determina las horas trabajadas (8 horas diarias).
  - Aplica tarifas predefinidas para horas extras, nocturnas, festivos, dietas y plus conductor.
  
- **Resultados inmediatos:**  
  Muestra el total a percibir en tiempo real.

- **Diseño moderno:**  
  Utiliza CSS Variables, Flexbox y transiciones suaves para una experiencia visual atractiva.

- **Modular y escalable:**  
  El código está organizado en módulos ES6, facilitando el mantenimiento y futuras mejoras.

---

## Cómo Funciona

1. **Introduce el período laboral:**  
   Selecciona la fecha de inicio y fin. El sistema calcula automáticamente los días y, a partir de ellos, las horas trabajadas (días × 8).

2. **Completa los datos complementarios:**  
   Introduce las horas extras, nocturnas, días festivos trabajados, dietas y plus conductor.  
   Cada uno de estos campos muestra, junto a la entrada, el valor unitario (extra, nocturno, festivo, etc.) extraído de la nómina.

3. **Calcula tu nómina:**  
   Al pulsar "Calcular Nómina", se suman el salario base y los complementos, mostrando el total a percibir.

4. **Guarda tu progreso:**  
   El nombre del trabajador y otros datos se guardan en `localStorage` para futuras pantallas.

---

## Requisitos

- **Navegador moderno:**  
  Chrome, Firefox, Edge, etc.
- Opcional: Un servidor local para servir ES6 Modules (puedes usar [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VSCode).

---

## Cómo Empezar

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ikerodeg/calculadora-nomina.git
   cd calculadora-nomina
   ```
   
Abre el archivo index.html o payroll.html en tu navegador (recomendado usar un servidor local).

¡Empieza a calcular tu nómina de forma interactiva!

Capturas y Demo
Puedes ver una demo interactiva del proyecto (imagen de ejemplo):


Contribuciones
¡Las contribuciones son bienvenidas!
Si deseas mejorar o añadir nuevas funcionalidades, por favor, crea un fork del repositorio y envía tus pull requests.

Licencia
Este proyecto está licenciado bajo la Licencia MIT.

¡Disfruta de la Calculadora de Nómina y que nunca te falte lo que te corresponde!

---







