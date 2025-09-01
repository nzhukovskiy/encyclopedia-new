import {Component, OnInit} from '@angular/core';
import {FormType} from '../../../../core/constants/form-type';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ArticlesApiService} from '../../services/articles-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Resource} from "../../models/resource";
import {Appointment} from "../../models/appointment";

@Component({
    selector: 'app-article-form',
    imports: [ReactiveFormsModule],
    templateUrl: './article-form.component.html',
    styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent implements OnInit {

    constructor(private readonly articlesApiService: ArticlesApiService,
                private readonly router: Router,
                private readonly route: ActivatedRoute) {

    }

    formType = FormType.UPDATE;

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

    ngOnInit(): void {
        this.route.data.subscribe(({article}) => {
            if (!article) {
                this.formType = FormType.CREATE;
                return;
            }
            this.articleFormGroup.patchValue(article);
            for (let resource of article.resources) {
                this.addResource(resource);
            }
            for (let appointment of article.appointments) {
                this.addAppointment(appointment);
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

    addSection() {
        this.articleFormGroup.controls.sections.push(new FormGroup({
            title: new FormControl("", {nonNullable: true}),
            columns: new FormArray([
                new FormGroup({
                    order: new FormControl(0, {nonNullable: true}),
                    text: new FormControl("", {nonNullable: true})
                })
            ])
        }))
    }

    addColumn(sectionIndex: number) {
        this.sections[sectionIndex].controls.columns.push(new FormGroup({
            order: new FormControl(1, {nonNullable: true}),
            text: new FormControl("", {nonNullable: true})
        }))
    }

    removeResource(index: number) {
        this.articleFormGroup.controls.resources.removeAt(index);
    }

    removeAppointment(index: number) {
        this.articleFormGroup.controls.appointments.removeAt(index);
    }

    removeSection(index: number) {
        this.articleFormGroup.controls.sections.removeAt(index);
    }

    removeColumn(sectionIndex: number, columnIndex: number) {
        this.sections[sectionIndex].controls.columns.removeAt(columnIndex);
    }

    createArticle() {
        console.log(this.articleFormGroup.getRawValue())
        // this.articlesApiService.create(this.articleFormGroup.getRawValue()).subscribe(() => {
        //     this.router.navigate([""]).then();
        // })
    }
}
