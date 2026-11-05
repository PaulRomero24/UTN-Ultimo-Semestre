package UTN.presentacion;

import java.util.Scanner;

import UTN.datos.EstudianteDAO;
import UTN.dominio.Estudiante;

public class SistemaEstudiantesApp {
    public static void main(String[] args) throws Exception {
        var salir = false;
        var consola = new Scanner(System.in);
        
        //CREACION DE LA INSTANCIA DE LA CLASE SERVICIO.
        var estudianteDAO = new EstudianteDAO();

        while(!salir){
            try {
                mostrarMenu();
                salir = ejecutarOpciones(consola, estudianteDAO);
            } catch (Exception e) {
                System.out.println("Ocurrio un error al ejecutar el menu: " + e.getMessage());
            }
        }
    }//FIN MAIN


    private static void mostrarMenu(){
    System.out.println("""
        ********* SISTEMA DE ESTUDIANTES ********
        1. LISTAR ESTUDIANTES
        2. BUSCAR ESTUDIANTE
        3. AGREGAR ESTUDIANTE
        4. MODIFICAR ESTUDIANTE
        5. ELIMINAR ESTUDIANTE 
        6. SALIR
        
        Eliga una opcion: 
    """);
}

private static boolean ejecutarOpciones(Scanner consola, EstudianteDAO estudianteDAO){
    var opcion = Integer.parseInt(consola.nextLine());
    var salir = false;

    switch(opcion){

        case 1 -> {
            System.out.println("LISTADO DE ESTUDIANTE : ");
            var estudiantes = estudianteDAO.listarEstudiantes();
            estudiantes.forEach(System.out::println);
        }

        case 2 -> {
            System.out.println("Introduce el ID del estudiante que estas buscando : ");
            var idEstudiante = Integer.parseInt(consola.nextLine());
            var estudiante = new Estudiante(idEstudiante);
            var encontrado = estudianteDAO.buscarEstudiantePorId(estudiante);
            if(encontrado)
                System.out.println("El estudiante es : "+ estudiante);
            else
                System.out.println("Estudiante no encontrado : " + estudiante);
            
        }

        case 3 -> {
            System.out.println("Ingrese los sgtes. datos : ");
            System.out.println("Nombre : ");
            var nombre = consola.nextLine();
            System.out.println("Apellido : ");
            var apellido = consola.nextLine();
            System.out.println("Telefono : ");
            var telefono = consola.nextLine();
            System.out.println("Email : ");
            var email = consola.nextLine();
            //CREACION DEL OBJETO 
            var estudiante = new Estudiante(nombre,apellido,telefono,email);
            var agregado = estudianteDAO.agregarEstudiante(estudiante);
            if(agregado)
                System.out.println("Estudiante agregado correctamente : "+estudiante);
            else
                System.out.println("Error al agregar el estudiante " + estudiante);
        }

        case 4 -> {
            System.out.println("Ingrese los sgtes. datos para modificar : ");
            System.out.println("El ID del estudiante : ");
            var idEstudiante = Integer.parseInt(consola.nextLine());
            System.out.println("Nombre : ");
            var nombre = consola.nextLine();
            System.out.println("Apellido : ");
            var apellido = consola.nextLine();
            System.out.println("Telefono : ");
            var telefono = consola.nextLine();
            System.out.println("Email : ");
            var email = consola.nextLine();

            //CREACION DEL OBJETO 
            var estudiante = new Estudiante(idEstudiante,nombre,apellido,telefono,email);
            var modificado = estudianteDAO.modificarEstudiante(estudiante);
            if(modificado)
                System.out.println("Estudiante modificado correctamente : "+ estudiante);
            else
                System.out.println("Error al modificar al estudiante : "+ estudiante);
        }

        case 5 -> {
            System.out.println("Ingrese el ID del estudiante que desea eliminar : ");
            var idEstudiante = Integer.parseInt(consola.nextLine());
            var estudiante = new Estudiante(idEstudiante);
            var eliminado = estudianteDAO.eliminarEstudiante(estudiante);
            if(eliminado)
                System.out.println("Estudiante eliminado correctamente : "+ estudiante);
            else
                System.out.println("Error al eliminar el estudiante : "+ estudiante);
            
        }

        case 6 -> {
            System.out.println("Gracias por usar el menú. ¡HASTA PRONTO!");
            salir = true;
        }
        default -> System.out.println("Opcion incorrecta, presione un digito del rango 1 - 6");
    }
    return salir;
} 

}


