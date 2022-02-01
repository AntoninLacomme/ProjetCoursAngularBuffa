import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HostListener } from '@angular/core';
import { NumberInput } from '@angular/cdk/coercion';

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
	countAssignments:NumberInput = 100

	//@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private assigmentsService: AssignmentsService) {
	}

	handlePage(e: PageEvent):void {
		this.assigmentsService.nextAssignments (e.pageSize, e.pageIndex * e.pageSize)
			.subscribe (assignments => {
				//this.assignments = [...this.assignments, ...assignments]
				if (assignments.length > 0) {
					this.assignmentsNonRendus = [];
					this.assignmentsRendus = [];
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
	  

	ngOnInit(): void {
		// appel au service pour récupérer les assignments
		this.addNewAssignments ();
		this.countsAssignments ();
	}

	addNewAssignments (): void {
		this.assigmentsService.nextAssignments (25, 0)
		.subscribe (assignments => {
			this.assignments = assignments;
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

	countsAssignments (): void {
		this.assigmentsService.count ()
			.subscribe (count => {
				if (count) {
					this.countAssignments = +count.count;
					console.log (this.countAssignments)
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
		if (event != undefined) {
			this.assignments.splice (this.assignments.indexOf (event), 1)
		}
	}

	drop(event: CdkDragDrop<Assignment[]>) {
		this.assignments.forEach (assignment => {
			if (assignment.id === event.item.data.id) {
				assignment.rendu = !assignment.rendu;
				this.assigmentsService.updateAssignment (assignment)
					.subscribe ();
			}
		})
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

	dragLeftToRight(item: CdkDrag<Assignment>) {
		return item.data.note !== null;
	}

	dragRightToLeft(item: CdkDrag<Assignment>) {
		return !item.data.rendu;
	}

}
