package utn.estudiantes;

import java.util.List;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import utn.estudiantes.modelo.Estudiantes2026;
import utn.estudiantes.servicio.EstudianteServicio;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	@Autowired
	private EstudianteServicio estudianteServicio;
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator();

	public static void main(String[] args) {
		logger.info("Iniciando la aplicacion de estudiantes...");
		// Levantamos la aplicación Spring Boot
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicacion finalizada.");
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		logger.info("Ejecutando el metodo run() de la aplicacion..." + nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while (!salir) {
			mostrarMenu();
			salir = ejecutarOpcion(consola);
			logger.info(nl);
		}
	}

	private void mostrarMenu() {
		logger.info("""
			-----------Menu de opciones---------------
			1. Listar estudiantes
			2. Buscar estudiante por ID
			3. Agregar estudiante
			4. Modificar estudiante
			5. Eliminar estudiante
			6. Salir
			Ingrese el numero de la opcion deseada: """);
	}
					

	private boolean ejecutarOpcion(Scanner consola) {
		var salir = false;
		try {
			var opcion = Integer.parseInt(consola.nextLine());
			switch (opcion) {
				// LISTAR ESTUDIANTE
				case 1 -> {
					logger.info(nl + "Listado de estudiantes:" + nl);
					List<Estudiantes2026> estudiantes = estudianteServicio.listarEstudiante();
					estudiantes.forEach(estudiante -> logger.info(estudiante.toString() + nl));
				}

				// BUSCAR ESTUDIANTE
				case 2 -> {
					logger.info("Digite el id del estudiante a buscar: ");
					var idEstudiante = Integer.parseInt(consola.nextLine());
					Estudiantes2026 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
					if (estudiante != null)
						logger.info("Estudiante encontrado: " + idEstudiante + nl);
					else
						logger.info("Estudiante no encontrado" + idEstudiante + nl);
				}
				// AGREGAR ESTUDIANTE
				case 3 -> {
					logger.info("Agregar estudiante: " + nl);
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Telefono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();

					var estudiante = new Estudiantes2026();
					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);
					estudianteServicio.guardarEstudiante(estudiante);
					logger.info("Estudiante agregado: " + estudiante + nl);
				}
				// MODIFICAR ESTUDIANTE
				case 4 -> {
					logger.info("MOdificiar estudiante: " + nl);
					logger.info("Ingrese el id del estudiante; ");
					var idEstudiante = Integer.parseInt(consola.nextLine());

					Estudiantes2026 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
					if (estudiante != null) {
						logger.info("Nombre: ");
						var nombre = consola.nextLine();
						logger.info("Apellido: ");
						var apellido = consola.nextLine();
						logger.info("Telefono: ");
						var telefono = consola.nextLine();
						logger.info("Email: ");
						var email = consola.nextLine();

						estudiante.setNombre(nombre);
						estudiante.setApellido(apellido);
						estudiante.setTelefono(telefono);
						estudiante.setEmail(email);
						estudianteServicio.guardarEstudiante(estudiante);
						logger.info("Estudiante modificado: "+ estudiante+nl);
					}
					else
						logger.info("Estudiante NO encontrado con el id: "+idEstudiante+nl);
				}
				//ELIMINAR ESTUDIANTE
				case 5 -> {
					logger.info("Digite el id del estudiante que quiere eliminar: "+nl);
					var idEstudiante = Integer.parseInt(consola.nextLine());

					var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
					
					if(estudiante != null){
						estudianteServicio.eliminarEstudiante(estudiante);
						logger.info("Estudiante eliminado: "+estudiante+nl);
					}
					else
						logger.info("Estudiante NO encontrado con id: "+estudiante+nl);
				}

				case 6 -> {
					logger.info("Saliendo de la aplicacion...");
					salir = true;
				}
				default -> {
					logger.info("Opcion invalida. Intente nuevamente.");
				}
			}
		} catch (NumberFormatException e) {
			logger.info(nl + "Entrada invalida. Debe ingresar un numero entero para elegir una opcion." + nl);
		}
		return salir;
	}
}
