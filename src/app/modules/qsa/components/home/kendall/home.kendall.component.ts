import { Component } from '@angular/core'

@Component({
    selector: 'home-kendall-component',
    templateUrl: './home.kendall.component.html'
})
export class HomeKendallComponent {
    public KendallCharacters = KendallCharacters
    private selectedKendallCharacter: KendallCharacters

    public selectKendallCharacter(kendallCharacter: KendallCharacters): void {
        this.selectedKendallCharacter = kendallCharacter
    }

    public getClassesForKendallCharacters(kendallCharacter: KendallCharacters): string {
        if (
            this.selectedKendallCharacter === kendallCharacter ||
            (kendallCharacter === KendallCharacters.A && !this.selectedKendallCharacter)
        ) {
            return 'btn btn-primary'
        } else {
            return 'btn'
        }
    }

    public getClassesForKendallList(kendallCharacter: KendallCharacters): string {
        if (
            this.selectedKendallCharacter === kendallCharacter ||
            (kendallCharacter === KendallCharacters.A && !this.selectedKendallCharacter)
        ) {
            return 'list-group-item list-group-item-action text-white active'
        } else {
            return 'list-group-item list-group-item-action'
        }
    }
}

enum KendallCharacters {
    A = 'A',
    B = 'B',
    c = 'c',
    K = 'K',
    n = 'n',
    D = 'D'
}
