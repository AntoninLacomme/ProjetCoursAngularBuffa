import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
	newDevoir = new Assignment ()
  constructor(private assigmentsService: AssignmentsService, 
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logging ();
  }

  onSubmit (event: Event) {
    const devoir = new Assignment ()
    devoir.id = Date.now ()
		devoir.nom = this.newDevoir.nom
		devoir.dateDeRendu = this.newDevoir.dateDeRendu
		devoir.rendu = false

		this.assigmentsService.addAssignment (devoir)
			.subscribe (message => {
				console.log (message)
        // on affiche la liste
        this.router.navigate (["/home"])
			})
	}
}
