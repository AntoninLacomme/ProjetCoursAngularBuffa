import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';
import { Matiere } from '../matiere.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;
  nomAssignment?: string;
  dateDeRendu?: Date;
  
  matieres?: Matiere[];

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { 
      this.assignmentsService.getMatieres().pipe(take(1)).subscribe(matieres => this.matieres = matieres);
    }

  ngOnInit(): void {
    this.getAssignment();

    this.authService.logging ();
    
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = this.route.snapshot.params["id"];
    this.assignmentsService.getAssignmentByID(id)
      .subscribe(assignment => this.assignment = assignment);
  }

  onSaveAssignment() {
    if (this.assignment) {
      if (this.nomAssignment) {
        this.assignment.nom = this.nomAssignment;
      };

      if (this.dateDeRendu) {
        this.assignment.dateDeRendu = this.dateDeRendu;
      }
      this.assignmentsService.updateAssignment(this.assignment)
        .subscribe(message => {
          console.log(message);

          this.router.navigate (["/home"])
        });

      // navigation vers la home page
      // this.router.navigate(["/home"]);
    }
  }
}
