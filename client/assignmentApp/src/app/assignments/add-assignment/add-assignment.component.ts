import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Matiere } from '../matiere.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  assignment: Assignment;
  matieres?: Matiere[];
  matiere?: Matiere;
  constructor(
    private assigmentsService: AssignmentsService, 
    private router: Router,
    private authService: AuthService
  ) {
    this.assignment = new Assignment();
    this.assigmentsService.getMatieres().pipe(take(1)).subscribe(matieres => this.matieres = matieres);
  }

  ngOnInit(): void {
    this.authService.logging();
  }

  onSubmit () {
    if (this.matiere === undefined && this.matieres === undefined) return;

    if (this.matiere !== undefined) {
      this.assignment.imageMatiere = this.matiere.imageMatiere;
      this.assignment.nomMatiere = this.matiere.nomMatiere;
      this.assignment.photoProf = this.matiere.photoProf;
    } else if (this.matieres !== undefined) {
      this.assignment.imageMatiere = this.matieres[0].imageMatiere;
      this.assignment.nomMatiere = this.matieres[0].nomMatiere;
      this.assignment.photoProf = this.matieres[0].photoProf;
    }

		this.assigmentsService.addAssignment(this.assignment).pipe(take(1))
      .subscribe (message => {
        console.log (message)
        // on affiche la liste
        this.router.navigate (["/home"])
      })
	}
}
