import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignmentTransmis?: Assignment
  @Output() dropAssignment = new EventEmitter<Assignment> ()

  constructor(private assignmentService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { 
  }
  
  ngOnInit(): void {
    this.getAssignment ();
    this.authService.logging ();
  }

  getAssignment () {
    const id = this.route.snapshot.params["id"];
    this.assignmentService.getAssignmentByID (id)
      .subscribe (assignment => {
        this.assignmentTransmis = assignment
        console.log (this.assignmentTransmis)
      })
  }

  onAssignmentRendu () {
    if (this.assignmentTransmis){
      this.assignmentTransmis.rendu = true;
      this.assignmentService.updateAssignment (this.assignmentTransmis)
        .subscribe (message => {
          this.router.navigate (["/home"])
        })
    }
  }

  onDelete () {
    if (this.assignmentTransmis){
      this.assignmentService.deleteAssignment (this.assignmentTransmis)
        .subscribe (message => {
          this.dropAssignment.emit (this.assignmentTransmis)
          this.assignmentTransmis = undefined
          console.log (message)
          this.router.navigate (["/home"])
        })
    }
  }

  onClickEdit () {
    if (this.assignmentTransmis) {
      this.router.navigate (["/assignment", this.assignmentTransmis.id, "edit"], 
        {
          queryParams: {
            nom: this.assignmentTransmis.nom,
            date: this.assignmentTransmis.dateDeRendu
          },
          fragment: "edition"
        }
      )
    }
  }

  isAdmin () {
    return !this.authService.loggedIn
  }
}
