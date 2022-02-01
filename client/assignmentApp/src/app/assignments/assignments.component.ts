import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HostListener } from '@angular/core';

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
		this.addNewAssignments ();
	}

	addNewAssignments (): void {
		this.assigmentsService.nextAssignments ()
		.subscribe (assignments => {
			//this.assignments = [...this.assignments, ...assignments]
			if (assignments.length > 0) {
				assignments.forEach (assignment => {
					assignment.rendu ?
						this.assignmentsRendus.push (assignment) :
						this.assignmentsNonRendus.push (assignment)
				})

				// setTimeout (() => {
				// 	this.addNewAssignments ();
				// }, 500)
			} else {

			}
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
		console.log (event)
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
