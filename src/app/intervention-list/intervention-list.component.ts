import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InterventionService } from '../services/intervention.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.scss']
})
export class InterventionListComponent implements OnInit {
  interventions: any[] = [];
  filterForm!: FormGroup;
  filteredInterventions: any[] = [];
  userRole: string | null = null;
  userIdUser: string | null = null;
  showOtherDaysButton = false;
  showCalendarView = false;
  selectedTechnician: number | null = null;
  technicians: any[] = []; 
  newInterventionDate = '';
  minDate = '';
  replanDate = '';
  logCallContact = '';
  logCallComment = '';
  selectedCallReason: number | null = null;
  selectedCallResult: number | null = null;
  callReasons: any[] = [];
  callResults: any[] = [];
  selectedCallResultId: any; 


    // Booleans to control dialogs
    showReplanDialogFlag = false;
    showPlanForTechDialogFlag = false;
    showLogCallDialogFlag = false;
  
    // Selected interventions for dialogs
    selectedIntervention: any | null = null;
    selectedInterventionForTech: any | null = null;
  

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private inter: InterventionService,
    private http: HttpClient
     ) { }


  ngOnInit(): void {
    this.userRole = this.auth.getRole();
    this.userIdUser = this.auth.getIdUser();
    this.selectedTechnician = null;
    this.selectedCallReason = null;
    this.selectedCallResult = null;
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];

    this.interventions = this.route.snapshot.data['interventions'].map((intervention: any) => ({
      ...intervention,
      isPlanForTechDialogOpen: false,
      isReplanDialogOpen: false,
      isLogCallDialogOpen: false
    }));

    this.fetchCallReasons();

    this.fetchTechs();

    if (this.userRole === 'Tech') {
      this.filterInterventionsByToday();
    }

    this.filterForm = this.formBuilder.group({
      date: [new Date()],
      interventionNumber: [''],
      interventionSN: [''],
      interventionPudo: [''],
      interventionParts: [''],
      interventionAddress: [''],
      interventionCP: [''],
      interventionTech: [''],
      interventionCompany: [''],
      interventionDC: [''],
      showStatus1: [false],
      showStatus2: [false],
      showStatus3: [false],
    });

    this.filteredInterventions = this.interventions;

    this.interventions.sort((a, b) => {
      if (a.status.id === 1) return -1;
      if (b.status.id === 1) return 1;
      return a.status.id - b.status.id;
    });
    console.log(this.interventions);
  }

  isShowDialogAllowed(intervention: any): boolean {
    if (this.userRole !== 'Tech') {
      return true;
    }
  
    return !intervention.calls.some((call: { callResult: { id: number; }; }) => [1, 2].includes(call.callResult.id));
  }

  isTechUserRole(): boolean {
    return this.userRole === 'Tech';
  }

  showLogCallDialog(intervention: any): void{
    if(intervention.isLogCallDialogOpen){
      this.closeLogCallDialog(intervention);
    } else {
      intervention.isLogCallDialogOpen = true;
      this.selectedIntervention = intervention;
      this.showLogCallDialogFlag = true;
      this.logCallComment = '';
      this.logCallContact = '';
    }
  }

  closeLogCallDialog(intervention: any){
    intervention.isLogCallDialogOpen = false;
  }

  showReplanDialog(intervention: any): void {
    
    if (intervention.isReplanDialogOpen) { 
       this.closeReplanDialog(intervention);
     } else {
      intervention.isReplanDialogOpen = true;
      this.selectedIntervention = intervention;
      this.showReplanDialogFlag = true;
      this.replanDate = '';
      this.minDate = new Date().toISOString().split('T')[0];
    }
  }

  closeReplanDialog(intervention: any) {
    intervention.isReplanDialogOpen = false;
  }

  closePlanForTechDialog(intervention: any): void {
    intervention.isPlanForTechDialogOpen = false;
  }
  
  showPlanForTechDialog(intervention: any): void {
    // Si le dialogue est déjà ouvert, fermez-le
    if (intervention.isPlanForTechDialogOpen) {
      this.closePlanForTechDialog(intervention);
    } else {
      // Sinon, ouvrez le dialogue "Plan for Tech"
      intervention.isPlanForTechDialogOpen = true;
      this.selectedInterventionForTech = intervention;
      this.selectedTechnician = null; 
      this.showPlanForTechDialogFlag = true;
    }
  }

  handleDateInput(event: any): void {
    const inputDate = new Date(event.target.value);
    const currentDate = new Date(this.minDate);

   
    if (inputDate < currentDate) {
     
      this.newInterventionDate = this.minDate;
    }
  }

  fetchCallReasons() {
    this.http.get<any[]>(`${environment.backendUrl}/call/getAllCallReasons`).subscribe(
      (response) => {
        this.callReasons = response;
      },
      (error) => {
        console.error('Error fetching callReasons:', error);
      }
    );
  }

  fetchCallResultsByReasons() {
    this.http.get<any[]>(`${environment.backendUrl}/call/getCallResultsByCallReason/` + this.selectedCallReason ).subscribe(
      (response) => {
        this.callResults = response;
      },
      (error) => {
        console.error('Error fetching callReasons:', error);
      }
    );
  }

  fetchTechs() {
    this.http.get<any[]>(`${environment.backendUrl}/users/getAllTechs`).subscribe(
      (response) => {
        this.technicians = response;
      },
      (error) => {
        console.error('Error fetching technicians:', error);
      }
    );
  }

  hasCallResult1Or2(intervention:any): boolean {
    for (const call of intervention.calls) {
      if (call.callResult.id === 1 || call.callResult.id === 2) {
        return true;
      }
    }
    return false;
  }
  
  getCallResultDescription(intervention:any): string {
    for (const call of intervention.calls) {
      if (call.callResult.id === 1 || call.callResult.id === 2) {
        return call.callResult.callResultDescription;
      }
    }
    return ''; // Retourne une chaîne vide si aucun appel correspondant n'est trouvé.
  }

  logCall(intervention: any): void {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
      
    const requestBody = {
      intervention: {
        idInternalInter: intervention.idInternalInter
      },
      callResult : {
        id: this.selectedCallResultId
      },
      userMail: this.auth.getUserMail(),
      comment: this.logCallComment,
      contactedPerson: this.logCallContact
    };
    console.log(requestBody)

    this.http.post(`${environment.backendUrl}/call/logCall`, requestBody, { headers }).subscribe(
      (response) => {
        
        console.log('Call logged successfully:', response);
  
      },
      (error) => {
        console.error('Error logging call:', error);
      }
    );
    location.reload();
    }

  planForTech(intervention: any): void {
    if (this.selectedTechnician !== null) {
      const interventionId = intervention.idInternalInter;
      const techId = this.selectedTechnician;
  
      this.inter.assignInterventionToTech(interventionId, techId).subscribe(
        (response) => {
          intervention.assignedTechnicianId = techId;
  
          this.selectedTechnician = null;
  
          console.log('Intervention attribuée avec succès.');
        },
        (error) => {
          console.error('Erreur lors de l\'attribution de l\'intervention au technicien :', error);
        }
      );
      location.reload();
    }
  }

  replanIntervention(intervention: any): void {
    if (this.replanDate) {
      const newDate = new Date(this.replanDate);
      const interventionId = intervention.idInternalInter; 
  
      console.log("Date à replanifier :", newDate);
      console.log("ID de l'intervention à replanifier :", interventionId);
  
      this.inter.replanIntervention(interventionId, newDate).subscribe(
        (response) => {
        
          intervention.interventionDate = newDate.toISOString().split('T')[0];
  
          this.showReplanDialogFlag = false;
          this.replanDate = '';
  
          console.log('Intervention replanifiée avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la replanification de l\'intervention :', error);
        }
      );
      location.reload();
    }
  }

  filterInterventionsByToday(): void {
    const currentDate = new Date();
    this.interventions = this.interventions.filter((intervention) => {
      const interventionDate = new Date(intervention.interventionDate);
      return (
        interventionDate.getFullYear() === currentDate.getFullYear() &&
        interventionDate.getMonth() === currentDate.getMonth() &&
        interventionDate.getDate() === currentDate.getDate()
      );
    });

    if (this.interventions.length === 0) {
      this.interventions.push({ message: 'No planning for today' });
    }
  }

  showAllDays(): void {
    this.interventions = this.route.snapshot.data['interventions'];

    this.interventions.sort((a, b) => {
      if (a.status.id === 1) return -1;
      if (b.status.id === 1) return 1;
      return a.status.id - b.status.id;
    });

    this.showOtherDaysButton = false;
  }

  resetFilters(): void {
    this.filterForm.reset({
    });
  
    this.filteredInterventions = this.interventions;
  }

  applyFilters(): void {
  const filters = this.filterForm.value;
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  console.log('Filters:', filters);

  this.filteredInterventions = this.interventions;

  if (this.filteredInterventions.length === 0) {
    this.filteredInterventions.push({ message: 'No planning for this day' });
  }


  if (filters.interventionNumber) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.idExternalInter.includes(filters.interventionNumber)
    );
  }

  if (filters.interventionSN) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.serialNumber.includes(filters.interventionSN)
    );
  }

  if (filters.interventionPudo) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.pudo.name.toLowerCase().includes(filters.interventionPudo)
    );
  }

  if (filters.interventionCompany) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.companyName.toLowerCase().includes(filters.interventionCompany)
    );
  }

  if (filters.interventionDC) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.directCustomer.toLowerCase().includes(filters.interventionDC)
    );
  }

  if (filters.interventionTech) {
    const searchValue = filters.interventionTech.toLowerCase(); 
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.users.firstname.toLowerCase().includes(searchValue) ||
      intervention.users.name.toLowerCase().includes(searchValue) ||
      intervention.users.techCode.toLowerCase().includes(searchValue)
    );
  }
  if (filters.interventionCP) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.contactPerson.toLowerCase().includes(filters.interventionCP)
    );
  }
  if (filters.interventionAddress) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention =>
      intervention.companyAddress.toLowerCase().includes(filters.interventionAddress)
    );
  }

  if (filters.showStatus1 || filters.showStatus2 || filters.showStatus3) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention => {
      const status1Match = filters.showStatus1 && intervention.status.id === 1;
      const status2Match = filters.showStatus2 && intervention.status.id === 2;
      const status3Match = filters.showStatus3 && intervention.status.id === 3;

      if (status1Match || status2Match || status3Match) {
        return true;
      }

      return false;
    });
  }
}
showCalendar(): void {
  this.showCalendarView = !this.showCalendarView;
}

}
