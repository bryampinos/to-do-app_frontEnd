import { Component, OnInit   } from '@angular/core';
import { TareaService } from '../services/tarea.service';
import { AlertController } from '@ionic/angular';
interface Plan {
  title: string;
  description: string;
  date: string;
  icon: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  
  alertButtons = ['Aceptar'];
  tareas: any[] = [];
  nuevaTarea: any = {};
  constructor(private tareaService: TareaService,  private alertController: AlertController) {}

  ngOnInit() {
    this.cargarTareas();
  }
  cargarTareas() {
    this.tareaService.obtenerTareas().subscribe(
      data => {
        this.tareas = data;
      },
      error => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }
  registrarTarea() {
    this.tareaService.registrarTarea(this.nuevaTarea).subscribe(
      response => {
        console.log('Tarea registrada exitosamente', response);
        this.cargarTareas();
        this.nuevaTarea = { tituloTarea: '' }; 
      },
      error => {
        console.error('Error al registrar la tarea', error);
      }
    );
  }

  completarTarea(idTarea: string) {
    this.tareaService.completarTarea(idTarea).subscribe(
      response => {
        console.log('Tarea completada exitosamente', response);
        this.cargarTareas();
 
      },
      error => {
        console.error('Error al completar la tarea', error);
      }
    );
  }
  async realizarEliminacion(idTarea: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Está seguro de eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.eliminartarea(idTarea);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminartarea(idTarea: string) {
    this.tareaService.eliminarTarea(idTarea).subscribe(
      response => {
        console.log('Tarea eliminada exitosamente', response);
        this.cargarTareas();
        // Aquí puedes manejar la respuesta, por ejemplo, actualizar la lista de tareas completadas.
      },
      error => {
        console.error('Error al completar la tarea', error);
      }
    );
  }

  tareasFiltradas(): any[] {
    return this.tareas.filter(tarea => tarea.estadoTarea !== 'eliminada');
  }

}
