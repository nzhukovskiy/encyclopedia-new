import {Component, OnInit} from '@angular/core';
import {FormType} from '../../../../core/constants/form-type';
import {AbstractControl, Form, FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ArticlesApiService} from '../../services/articles-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Resource} from "../../models/resource";
import {Appointment} from "../../models/appointment";
import {Article} from '../../models/article';
import { Section } from '../../models/section';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DateValueAccessorDirective} from '../../../../core/directives/date-value-accessor.directive';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../shared/components/dialog/dialog.component";
import {filter} from "rxjs";
import {SubmitDialogReturn} from "../../../../shared/constants/submit-dialog-return";

@Component({
    selector: 'app-article-form',
    imports: [ReactiveFormsModule, FormFieldComponent, NgbModule, DateValueAccessorDirective, MatIconModule, ButtonComponent],
    templateUrl: './article-form.component.html',
    styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent implements OnInit {

    constructor(private readonly articlesApiService: ArticlesApiService,
                private readonly router: Router,
                private readonly route: ActivatedRoute,
                private readonly matDialog: MatDialog) {

    }

    formType = FormType.UPDATE;
    showBirth = false;
    showDeath = false;

    articleFormGroup = new FormGroup({
        title: new FormControl("", {nonNullable: true}),
        body: new FormControl("", {nonNullable: true}),
        birth: new FormGroup({
            date: new FormControl<Date>(new Date(), {nonNullable: true}),
            place: new FormGroup({
                country: new FormControl("", {nonNullable: true}),
                place: new FormControl("", {nonNullable: true}),
            })
        }),
        death: new FormGroup({
            date: new FormControl<Date>(new Date(), {nonNullable: true}),
            place: new FormGroup({
                country: new FormControl("", {nonNullable: true}),
                place: new FormControl("", {nonNullable: true}),
            })
        }),
        resources: new FormArray<FormGroup<{
            key: FormControl<string>,
            value: FormControl<string>
        }>>([]),
        appointments: new FormArray<FormGroup<{
            title: FormControl<string>,
            startDate: FormControl<Date>,
            endDate: FormControl<Date>,
            predecessor: FormControl<string>,
            successor: FormControl<string>,
        }>>([]),
        sections: new FormArray<FormGroup<{
            title: FormControl<string>,
            columns: FormArray<FormGroup<{
                order: FormControl<number>,
                text: FormControl<string>
            }>>
        }>>([]),

    })

    article?: Article;

    protected readonly FormType = FormType;

    ngOnInit(): void {
        this.route.data.subscribe(({article}) => {
            this.article = article;
            if (!article) {
                this.formType = FormType.CREATE;
                return;
            }
            this.articleFormGroup.patchValue(article);
            if (article.birth) {
                this.showBirth = true;
            }
            if (article.death) {
                this.showDeath = true;
            }
            for (let resource of article.resources) {
                this.addResource(resource);
            }
            for (let appointment of article.appointments) {
                this.addAppointment(appointment);
            }
            for (let section of article.sections) {
                this.addSection(section);
            }
        })
    }

    get resources() {
        return this.articleFormGroup.controls.resources.controls;
    }

    get appointments() {
        return this.articleFormGroup.controls.appointments.controls;
    }

    get sections() {
        return this.articleFormGroup.controls.sections.controls;
    }

    addBirthSection() {
        this.articleFormGroup.setControl("birth", new FormGroup({
            date: new FormControl<Date>(new Date(), {nonNullable: true}),
            place: new FormGroup({
                country: new FormControl("", {nonNullable: true}),
                place: new FormControl("", {nonNullable: true}),
            })
        }),)
    }

    addDeathSection() {
        this.articleFormGroup.setControl("death", new FormGroup({
            date: new FormControl<Date>(new Date(), {nonNullable: true}),
            place: new FormGroup({
                country: new FormControl("", {nonNullable: true}),
                place: new FormControl("", {nonNullable: true}),
            })
        }),)
    }

    addResource(resource?: Resource) {
        this.articleFormGroup.controls.resources.push(new FormGroup({
            key: new FormControl(resource ? resource.key : "", {nonNullable: true}),
            value: new FormControl(resource ? resource.value : "", {nonNullable: true})
        }))
    }

    addAppointment(appointment?: Appointment) {
        this.articleFormGroup.controls.appointments.push(new FormGroup({
            title: new FormControl(appointment ? appointment.title : "", {nonNullable: true}),
            startDate: new FormControl(appointment ? appointment.startDate : new Date(), {nonNullable: true}),
            endDate: new FormControl(appointment ? appointment.endDate : new Date(), {nonNullable: true}),
            predecessor: new FormControl(appointment ? appointment.predecessor : "", {nonNullable: true}),
            successor: new FormControl(appointment ? appointment.successor : "", {nonNullable: true}),
        }))
    }

    addSection(section?: Section) {
        this.articleFormGroup.controls.sections.push(new FormGroup({
            title: new FormControl(section ? section.title : "", {nonNullable: true}),
            columns: new FormArray(
                section ?
                section!.columns.map((x, i) => new FormGroup({
                    order: new FormControl(i, {nonNullable: true}),
                    text: new FormControl(x.text, {nonNullable: true})
                })) :
                [
                    new FormGroup({
                        order: new FormControl(0, {nonNullable: true}),
                        text: new FormControl("", {nonNullable: true})
                }
                )]
            )
        }))
    }

    addColumn(sectionIndex: number) {
        this.sections[sectionIndex].controls.columns.push(new FormGroup({
            order: new FormControl(0, {nonNullable: true}),
            text: new FormControl("", {nonNullable: true})
        }))
        this.setColumnOrder(sectionIndex);
    }

    removeResource(index: number) {
        this.matDialog.open(DialogComponent).afterClosed()
            .pipe(filter((x) => x === SubmitDialogReturn.ACCEPT))
            .subscribe(() => {
                this.articleFormGroup.controls.resources.removeAt(index);
            })
    }

    removeAppointment(index: number) {
        this.matDialog.open(DialogComponent).afterClosed()
            .pipe(filter((x) => x === SubmitDialogReturn.ACCEPT))
            .subscribe(() => {
                this.articleFormGroup.controls.appointments.removeAt(index);
            })
    }

    removeSection(index: number) {
        this.matDialog.open(DialogComponent).afterClosed()
            .pipe(filter((x) => x === SubmitDialogReturn.ACCEPT))
            .subscribe(() => {
                this.articleFormGroup.controls.sections.removeAt(index);
            })
    }

    removeColumn(sectionIndex: number, columnIndex: number) {
        this.matDialog.open(DialogComponent).afterClosed()
            .pipe(filter((x) => x === SubmitDialogReturn.ACCEPT))
            .subscribe(() => {
                this.sections[sectionIndex].controls.columns.removeAt(columnIndex);
                this.setColumnOrder(sectionIndex);
            })
    }

    handleFormSubmission() {
        if (this.formType === FormType.CREATE) {
            this.createArticle();
        }
        else {
            this.updateArticle();
        }
    }

    private createArticle() {
        this.articlesApiService.create(this.getProcessedArticle()).subscribe(() => {
            this.router.navigate([""]).then();
        })
    }

    private updateArticle() {
        this.articlesApiService.update(this.article!._id, this.getProcessedArticle()).subscribe(() => {
            this.router.navigate([""]).then();
        })
    }

    private setColumnOrder(sectionIndex: number) {
        this.sections[sectionIndex].controls.columns.controls.forEach((x, i) => {
            x.controls.order.patchValue(i);
        })
    }

    private getProcessedArticle() {
        const article = this.articleFormGroup.getRawValue();
        return {...article,
            birth: this.showBirth ? article.birth : null,
            death: this.showDeath ? article.death : null}
    }
}
