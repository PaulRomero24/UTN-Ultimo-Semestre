package utn.tienda_libros.vista;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Toolkit;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.w3c.dom.events.MouseEvent;

import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

@Component
public class LibroFrom extends JFrame {

    private final LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;
        createUIComponent();
        iniciarForma();
        agregarButton.addActionListener(e -> agregarLibro());

        tablaLibros.addMouseMotionListener(new MouseAdapter(){
            @Override
            public void mouseClicked(MouseEvent e){
                super.mouseClicked(e);
                cargarLibroSeleccionado();
            }
        });

        modificarButton.addActionListener(e -> modificarLibro());
        modificarButton.addActionListener(e-> eliminarLibro());
    }

    private void iniciarForma() {
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 700);

        // Para obtener las dimensiones de la ventana
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth()) / 2;
        int y = (tamanioPantalla.height - getHeight()) / 2;
        setLocation(x, y);
    }

    private void agregarLibro() {
        // Leer los valores del formulario
        if (libroTexto.getText().equals("")) {
            mostrarMensaje("Ingrese el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }

        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());
        //CREACION DEL OBJETO LIBRO
        var libro = new Libro(null, nombreLibro, autor, precio, existencias);
        // AGREGAR EL LIBRO A LA BASE DE DATOS
        libroServicio.guardarLibro(libro);
        mostrarMensaje("Libro agregado correctamente");
        limpiarFormulario();
        listarLibros();
    }

    private void cargarLibroSeleccionado(){
        //Los indices de la columna comienzan en 0 
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            String idLibro = 
                    tablaLibros.getModel().getValueAt(renglon,0).toString();
            idTexto.setText(idLibro);
            
            String nombreLibro =
                    tablaLibros.getModel().getValueAt(renglon, 1).toString();
            libroTexto.setText(nombreLibro);

            String autor =
                    tablaLibros.getModel().getValueAt(renglon, 2).toString();       
            autorTexto.setText(autor);

            String precios =
                    tablaLibros.getModel().getValueAt(renglon, 3).toString();
             precioTexto.setText(precios);
            
             String existencias =
                    tablaLibros.getModel().getValueAt(renglon, 4).toString();
            existenciasTexto.setText(existencias);
        }
    }

    private void modificarLibro(){
        if(this.idTexto.equals("")){
            mostrarMensaje("Debes seleccionar un registro de la tabla");
        }
        else{
            //VERIFICAR QUE NO SEA NULL
            if(libroTexto.getText().equals("")){
                mostrarMensaje("Digite el nombre del libro...");
                libroTexto.requestFocusInWindow();
                return;
            }
            //LLENAMOS EL OBJETO
            int idLibro = Integer.parseInt(idTexto.getText());
            var nombreLibro = libroTexto.getText();
            var autor = autorTexto.getText();
            var precio =Double.parseDouble(precioTexto.getText());
            var existencias = Integer.parseInt(existenciasTexto.getText());
            var libro = new Libro(idLibro,nombreLibro,autor,precio,existencias);
            libroServicio.guardarLibro(libro);
            mostrarMensaje("Se modifico el libro...");
            limpiarFormulario();
            listarLibros();
        }
    }

    private void eliminarLibro(){
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            String idLibro = tablaLibros.getModel().getValueAt(renglon, 0).toString();
            var libro = new Libro();
            libro.setIdLibro(Integer.parseInt(idLibro));
            libroServicio.eliminarLibro(libro);
            mostrarMensaje("Libro "+ idLibro+" ELIMINADO");
            limpiarFormulario();
            listarLibros();
        }
        else{
            mostrarMensaje("No se ha seleccionado ningun libro de la tabla a eliminar");

        }
    }

    private void limpiarFormulario() {
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponent() {
        idTexto = new JTextField("");
        idTexto.setVisible(false);
        this.panel = new JPanel(new BorderLayout());

        this.tablaModeloLibros = new DefaultTableModel(0, 5){
            @Override 
            public boolean isCellEditable(int row,int column){
                return false;
            }
        };

        String[] cabecera = { "Id", "Libro", "Autor", "Precio", "Existencias" };
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        //INSTANCIAR EL OBJETO DE JTABLE
        this.tablaLibros = new JTable(this.tablaModeloLibros);
        tablaLibros.setSelectionMode(ListSelectionMode.SINGLE_SELECTION);
        listarLibros();
    }

    private void listarLibros() {
        // LIMPIAR TABLA
        tablaModeloLibros.setRowCount(0);
        // OBTENER LIBROS DE LA BASE DE DATOS
        var libros = libroServicio.listarLibros();
        // ITERAMOS EL LIBRO
        libros.forEach((libro) -> {
            Object[] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });
    }


}
