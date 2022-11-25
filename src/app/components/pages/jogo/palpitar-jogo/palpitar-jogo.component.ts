import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Selecao } from "src/app/models/selecao.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {
  nome!: string;
  id!: string;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http.get<Selecao>(`https://localhost:5001/api/selecao/buscar/${id}`).subscribe({
            next: (selecao) => {
              this.id = id;
              this.nome = selecao.nome;
            },
          });
        }
      },
    });
  }
}
