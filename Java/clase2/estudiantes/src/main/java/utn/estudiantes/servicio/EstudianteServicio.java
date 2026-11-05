package utn.estudiantes.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.estudiantes.modelo.Estudiantes2026;
import utn.estudiantes.repositorio.EstudianteRepositorio;

@Service
public class EstudianteServicio implements IEstudianteServicio{

    @Autowired
    private EstudianteRepositorio estudianteRepositorio;

    @Override
    public List<Estudiantes2026> listarEstudiante() {
        List<Estudiantes2026> estudiantes = estudianteRepositorio.findAll();
        return estudiantes;
    }

    @Override
    public Estudiantes2026 buscarEstudiantePorId(Integer idEstudiante) {
        Estudiantes2026 estudiante = estudianteRepositorio.findById(idEstudiante).orElse(null);
        return estudiante;
    }

    @Override
    public void guardarEstudiante(Estudiantes2026 estudiante) {
        Estudiantes2026 estudianteGuardado = estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(Estudiantes2026 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }

}
