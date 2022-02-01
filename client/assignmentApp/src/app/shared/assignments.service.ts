import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs'
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { map, tap } from 'rxjs';
import { url } from './data';

@Injectable({
	providedIn: 'root'
})
export class AssignmentsService {
	url = "api/assignments"

	constructor(private loggingService: LoggingService, private http:HttpClient) { 
		this.url = url + this.url;
	}

	peuplerBD () {
	// 	bdInitialAssignments.forEach (a => {
	// 		let assignment = new Assignment ();
	// 		assignment.nom = a.nom;
	// 		assignment.id = a.id;
	// 		assignment.dateDeRendu = new Date(a.dateDeRendu);
	// 		assignment.rendu = a.rendu;
	// 		assignment.author = a.author;
	// 		assignment.nomMatiere = a.nomMatiere;
	// 		assignment.imageMatiere = a.imageMatiere;
	// 		assignment.photoProf = a.photoProf;
	// 		assignment.note = a.note;
	// 		assignment.remarque = remarque;

	// 		this.addAssignment (assignment)
	// 			.subscribe (response => {
	// 				console.log (response)
	// 			})
	// 	})
	}
	
	getAssignments (): Observable<Assignment[]> {
		return this.http.get<Assignment[]>(this.url)
	}

	getAssignmentByID(id: number): Observable<Assignment | undefined> {
		//return of(this.assignments.find(elem => elem.id == id));
		return this.http.get<Assignment> (this.url + "/" + id)
		.pipe (
			map (a => {
				//a.nom += " modifié par un map !"
				return a;
			}),
			tap (a => {
				console.log ("Tap: reçu assignment de nom = " + a.nom)
			}),
			catchError (this.handleError<Assignment>(`### catchError : getAssignment(id=${id})`))
		)
	}

	private handleError<T>(operation: any, result?: T) {
		return (error:any) : Observable<T> => {
			console.error (error);
			console.log (operation + " a échoué " + error.message);
			
			return of (result as T)
		}
	}

	// addAssignment(assignment: Assignment): Observable<string> {
	// 	this.assignments.push(assignment)
	// 	if (assignment.nom)
	// 		this.loggingService.log(assignment.nom, " ajouté !")
	// 	return of("Assignement " + assignment.nom + " ajouté !")
	// }

	addAssignment(assignment: Assignment): Observable<any> {
		return this.http.post<Assignment> (this.url, assignment)
	}


	// updateAssignment(assignment: Assignment): Observable<string> {
	// 	// const a: Assignment = this.assignments.find(elem => elem.id == assignment.id);
	// 	// a = assignment

	// 	return of("Assignment " + assignment.nom + " modifié !")
	// }

	updateAssignment(assignment: Assignment): Observable<any> {
		return this.http.put<Assignment> (this.url, assignment)
	}

	deleteAssignment(assignment: Assignment): Observable<any> {
		// this.assignments.splice(this.assignments.indexOf(assignment), 1)
		// return of("Assignment " + assignment.nom + " supprimé !")
		return this.http.delete (this.url + "/" + assignment._id)
	}
}
