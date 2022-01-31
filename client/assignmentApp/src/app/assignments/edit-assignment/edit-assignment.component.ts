import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;
  nomAssignment?: string;
  dateDeRendu?: Date;
  
  matieres = [
    {
        "nomMatiere": "Base de Donnée",
        "imageMatiere": "bdd.png",
        "photoProf": "prof1.jpg"
    },
    {
        "nomMatiere": "Technologies Web",
        "imageMatiere": "technoweb.png",
        "photoProf": "prof2.jpg"
    },
    {
        "nomMatiere": "Grails",
        "imageMatiere": "grails.png",
        "photoProf": "prof3.jpg"
    },
    {
        "nomMatiere": "Clustering",
        "imageMatiere": "clustering.jpg",
        "photoProf": "prof4.jpg"
    },
    {
        "nomMatiere": "Gestion de Projet",
        "imageMatiere": "projet.png",
        "photoProf": "prof5.jpg"
    },
    {
        "nomMatiere": "Manipulation 3D",
        "imageMatiere": "3d.jpg",
        "photoProf": "prof6.jpg"
    }
];

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();

    console.log ("Query params :");
    console.log (this.route.snapshot.queryParams);
    console.log ("Fragment d'url");
    console.log (this.route.snapshot.fragment)
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params["id"];
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
