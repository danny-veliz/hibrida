import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';
import { IonFab, IonFabButton, IonIcon, IonCard } from '@ionic/angular/standalone';
import { IonCardContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { PercentPipe } from '@angular/common';
import { TeachablemachineService } from '../services/teachablemachine.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule,IonCardContent, IonButton, IonList, IonItem, IonLabel, PercentPipe,IonFab, IonFabButton, IonIcon, IonCard,IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
  providers: [TeachablemachineService],
})
export class Tab1Page  {
  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;
  imageReady = signal(false);
  imageUrl = signal('https://teachablemachine.withgoogle.com/models/JR2Xl_786/');
  modelLoaded = signal(false);
  classLabels: string[] = [];
  predictions: any[] = [];
  

  constructor(private teachablemachine: TeachablemachineService) {
    addIcons({ cloudUploadOutline });
  }
  async ngOnInit() {
    await this.teachablemachine.loadModel();
    this.classLabels = this.teachablemachine.getClassLabels();
    this.modelLoaded.set(true);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl.set(reader.result as string);
        this.imageReady.set(true);
      };

      reader.readAsDataURL(file);
    }
    console.log('Imagen cargada:', this.imageUrl());

  }
  async predict() {
    try {
      const image = this.imageElement.nativeElement;
      if (!image.src) {
        alert('Selecciona una imagen antes de predecir.');
        return;
      }
      this.predictions = await this.teachablemachine.predict(image);
      console.log('Predicciones:', this.predictions);
    } catch (error) {
      console.error('Error al predecir:', error);
      alert('Error al realizar la predicción.');
    }
  }
  
  

}
