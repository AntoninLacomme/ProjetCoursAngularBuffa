import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
	newDevoir = new Assignment ()
  constructor(private assigmentsService: AssignmentsService, private router: Router) { }

  ngOnInit(): void {
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
