import { Component } from '@angular/core';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea, IonButton,
  IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
/* Importe el módulo para formularios reactivos */
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* Importe el servicio */
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSelect, IonSelectOption, IonTextarea, IonButton,
    IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {
  
  collectionName = 'suggestions';
  /* Arreglo con datos locales */
  suggestionsList: any[] = [];

  constructor(private providerService: ProviderService) { }

  /* Formulario reactivo */
  suggestionForm: FormGroup = new FormGroup({
    rating: new FormControl("", Validators.required),
    suggestion: new FormControl("", Validators.required)
  });

  /* Método para enviar las sugerencias mediante el servicio */
  onSubmitSuggestion() {
    if (this.suggestionForm.valid) {
      const suggestionData = {
        rating: this.suggestionForm.value.rating,
        text: this.suggestionForm.value.suggestion
      };

      this.providerService.createDocument(this.collectionName, suggestionData).then(() => {
        this.suggestionForm.reset(); // Resetea el formulario después de enviar
      });
    }
  }

  /* Al inicializar, carga las sugerencias desde el servicio */
  ngOnInit() {
    this.loadSuggestions();
  }

  /* Método para cargar las sugerencias desde la base de datos */
  loadSuggestions() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
      this.suggestionsList = data;
    });
  }
}
