package UTN.datos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static UTN.conexion.Conexion.getConnection;
import UTN.dominio.Estudiante;

public class EstudianteDAO{
    
    public List<Estudiante> listarEstudiantes() {
        List<Estudiante> estudiantes = new ArrayList<>();
        // Lógica para obtener estudiantes de la base de datos
        PreparedStatement ps;// Envia la sentencia SQL a la base de datos
        ResultSet rs;// Obtiene el resultado de la sentencia SQL

        
        //CREACION DE OBJETO TIPO CONEXION
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2026 ORDER BY idestudiantes2026";
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiantes2026"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));

                //FALTA AGREGARLO A LA LISTA
                estudiantes.add(estudiante);
            }
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al seleccionar datos" + e.getMessage());
        }
        finally{
            try {
                con.close();
            } catch (SQLException e) {
                System.out.println("Ocurrio un error al cerrar conexion"+e.getMessage());
            }
        }
        return estudiantes;
    }

//METODO POR ID
public boolean buscarEstudiantePorId(Estudiante estudiante){
    PreparedStatement ps;
    ResultSet rs;
    Connection con = getConnection();
    String sql = "SELECT * FROM estudiantes2026 WHERE idestudiantes2026=?";
    try {
        ps = con.prepareStatement(sql);
        ps.setInt(1,estudiante.getIdEstudiante());
        rs = ps.executeQuery();

        if(rs.next()){
            estudiante.setNombre(rs.getString("nombre"));
            estudiante.setApellido(rs.getString("apellido"));
            estudiante.setTelefono(rs.getString("telefono"));
            estudiante.setEmail( rs.getString("email"));
            return true;
        }
    } catch (SQLException e) {
        System.out.println("Ocurrio un error en la busqueda" + e.getMessage());
    }
    finally{
        try {
            con.close();
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al cerrar conexion"+ e.getMessage());
        }
    }
    return false;
}

//METODO PARA AGREGAR
public boolean agregarEstudiante(Estudiante estudiante){
    PreparedStatement ps;
    Connection con = getConnection();
    String sql = "INSERT INTO estudiantes2026 (nombre,apellido,telefono,email) VALUES (?, ?, ?, ?)";
    try {
        ps = con.prepareStatement(sql);
        ps.setString(1,estudiante.getNombre());
        ps.setString(2,estudiante.getApellido());
        ps.setString(3,estudiante.getTelefono());
        ps.setString(4,estudiante.getEmail());
        ps.execute();
        return true;
    } catch (SQLException e) {
        System.out.println("Ocurrio un error al agregar estudiante" + e.getMessage());
    }
    finally{
        try {
            con.close();
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al cerrar conexion"+ e.getMessage());
        }
    }
    return false;
}

//METODO MODIFICAR
public boolean modificarEstudiante(Estudiante estudiante){
    PreparedStatement ps;
    Connection con = getConnection();
    String sql = "UPDATE estudiantes2026 SET nombre= ? , apellido= ? , telefono= ? , email= ? WHERE idestudiantes2026= ?";
    try {
        ps = con.prepareStatement(sql);
        ps.setString(1,estudiante.getNombre());
        ps.setString(2,estudiante.getApellido());
        ps.setString(3,estudiante.getTelefono());
        ps.setString(4,estudiante.getEmail());
        ps.setInt(5, estudiante.getIdEstudiante());
        ps.execute();
        return true;
    } catch (SQLException e) {
        System.out.println("Ocurrio un error al modificar el estudiante" + e.getMessage());
    }
    finally{
        try {
            con.close();
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al cerrar conexion"+ e.getMessage());
        }
    }
    return false;

}
public boolean eliminarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE FROM estudiantes2026 WHERE idestudiantes2026=?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1,estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (SQLException e) {
            System.out.println("Error al eliminar el estudiante: "+ e.getMessage());
        }
        finally{
            try {
                con.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar la conexion "+ e.getMessage());
            }
        }
        return false;
    }




    //TESTEO DE LA CLASE

    public static void main(String[] args) {
        var estudianteDao = new EstudianteDAO();

        ////TEST AGREGAR
        /// 
        //var nuevoEstudiante = new Estudiante("alberto","bolañoz","260241242","bolañitos@gmail.com");
        //var agregado = estudianteDao.agregarEstudiante(nuevoEstudiante);
        //if(agregado)
        //    System.out.println("Estudiante agregado correctamente " + nuevoEstudiante);
        //else
        //    System.out.println("Error al agregar el estudiante "+ nuevoEstudiante);


        //TEST MODIFICAR

        //var estudianteModificado = new Estudiante(1,"alberto","Pedriz","26024124","pedriz@gmail.com");
        //var modificado = estudianteDao.modificarEstudiante(estudianteModificado);
        //if(modificado)
        //    System.out.println("Estudiante modificado correctamente" + estudianteModificado);
        //else
        //    System.out.println("El estudiante no fue modificado"+ estudianteModificado);

        //TEST ELIMINAR
        var eliminarEstudiante = new Estudiante(3);
        var eliminado = estudianteDao.eliminarEstudiante(eliminarEstudiante);
        if(eliminado)
            System.out.println("Estudiante eliminado correctamente: "+ eliminarEstudiante);
        else
            System.out.println("Error al eliminar Estudiante: " + eliminarEstudiante);
        //TEST BUSCAR POR LISTA
        System.out.println("Listado de Estudiantes");
        List<Estudiante> estudiantes = estudianteDao.listarEstudiantes();
        estudiantes.forEach(System.out::println);//FUNCION LAMBDA

        //TEST BUSCAR POR ID
        //var estudiante1 = new Estudiante(2);
        //System.out.println("Estudiantes antes de la busqueda :" + estudiante1);
        //System.out.println("Buscar por ID");
        //var encontrado = estudianteDao.buscarEstudiantePorId(estudiante1);
        //if (encontrado)
        //    System.out.println("Estudiante encontrado : "+ estudiante1);
        //else
        //    System.out.println("No se encontro el estudiante"+ estudiante1.getIdEstudiante());
        
    }
}
