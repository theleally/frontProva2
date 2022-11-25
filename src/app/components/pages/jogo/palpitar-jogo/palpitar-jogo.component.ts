import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Selecao } from "src/app/models/selecao.model";
import { Jogo } from "src/app/models/jogo.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {
  selecaoA!: Selecao;
  selecaoB!: Selecao;
  id!: string;
  selecoes!: Selecao[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http
            .get<Jogo>(`https://localhost:5001/api/jogo/buscar/${id}`)
            .subscribe({
              next: (jogo) => {
                this.id = id;
              },
            });
        }
      },
    });
  }

  palpitar(): void {
    let jogo: Jogo = {
      id: Number.parseInt(this.id),
      selecaoA: this.selecaoA,
      selecaoB: this.selecaoB,
    };
  }
}
