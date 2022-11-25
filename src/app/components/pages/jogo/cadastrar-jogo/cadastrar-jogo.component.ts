import { Component, OnInit } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Selecao } from "src/app/models/selecao.model";
import { Jogo } from "src/app/models/jogo.model";
import { SelectControlValueAccessor } from "@angular/forms";


@Component({
  selector: "app-cadastrar-jogo",
  templateUrl: "./cadastrar-jogo.component.html",
  styleUrls: ["./cadastrar-jogo.component.css"],
})
export class CadastrarJogoComponent implements OnInit {
  selecoes!: Selecao[];
  id!: number;

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar").subscribe({
      next: (selecoes) => {
        this.selecoes = selecoes;
      },
    });
  }

  cadastrar(): void {
    console.log(this.id);

    let jogo: Jogo = {
      
    };

    this.http.post<Jogo>("https://localhost:5001/api/jogo/cadastrar", jogo).subscribe({
      next: (jogo) => {
        this._snackBar.open("Jogo cadastrado!", "Ok!", {
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/jogo/listar"]);
      },
    });
  }

  
}
