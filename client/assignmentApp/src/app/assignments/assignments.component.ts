import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-assignments',
	templateUrl: './assignments.component.html',
	styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
	assignments:Assignment[] = []
	assignmentsRendus:Assignment[] = []
	assignmentsNonRendus:Assignment[] = []
	assignmentSelectionne?:Assignment

	constructor(private assigmentsService: AssignmentsService) {
	}

	ngOnInit(): void {
		// appel au service pour récupérer les assignments
		this.assigmentsService.getAssignments ()
			.subscribe (assignments => {
				this.assignments = assignments
				this.assignments.forEach (assignment => {
					assignment.rendu ?
						this.assignmentsRendus.push (assignment) :
						this.assignmentsNonRendus.push (assignment)
				})
			})

	}

	assignmentClique (assignment: Assignment) {
		this.assignmentSelectionne = assignment
	}

	peuplerBD () {
		this.assigmentsService.peuplerBD ();
	}
/*
	addAssignment (assignment: Assignment) {
		//this.assignments.push (assignment)
		this.assigmentsService.addAssignment (assignment)
			.subscribe (message => {
				console.log (message)
			})
	}

	onNewAssignment (event: Assignment) {
		this.addAssignment (event)
	}
*/
	onDropAssignment (event: Assignment) {
		console.log (event)
		if (event != undefined) {
			this.assignments.splice (this.assignments.indexOf (event), 1)
		}
	}

	drop(event: CdkDragDrop<Assignment[]>) {
		if (event.previousContainer === event.container) {
		  	moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}
	}
}
