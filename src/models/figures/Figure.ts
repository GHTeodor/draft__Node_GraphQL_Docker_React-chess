import logo from "../../assets/black-king.png";
import {Colours} from "../Colours";
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = "Figure",
    KING = "King",
    KNIGHT = "Knight",
    PAWN = "Pawn",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop"
}

export class Figure {
    colour: Colours;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(colour: Colours, cell: Cell) {
        this.colour = colour;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell): boolean {
        if (target.figure?.colour === this.colour) return false;
        if (target.figure?.name === FigureNames.KING) return false;
        return true;
    }

    moveFigure(target: Cell) {
    }
}
