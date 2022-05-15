import {Figure, FigureNames} from "./Figure";
import {Colours} from "../Colours";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

export class Queen extends Figure {

    constructor(colour: Colours, cell: Cell) {
        super(colour, cell);
        this.logo = colour === Colours.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        if (this.cell.isEmptyVertical(target)) return true;
        if (this.cell.isEmptyHorizontal(target)) return true;
        if (this.cell.isEmptyDiagonal(target)) return true;
        return false;
    }
}
