import {Component, OnInit} from '@angular/core';
import {FormType} from '../../../../core/constants/form-type';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ArticlesApiService} from '../../services/articles-api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-article-form',
    imports: [ReactiveFormsModule],
    templateUrl: './article-form.component.html',
    styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent implements OnInit {

    constructor(private readonly articlesApiService: ArticlesApiService,
                private readonly router: Router) {

    }

    formType = FormType.CREATE;

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
        resources: new FormArray<FormGroup<{ key: FormControl<string>, value: FormControl<string> }>>([]),
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
                order: FormControl<string>,
                text: FormControl<string>
            }>>
        }>>([]),

    })

    ngOnInit(): void {
        if (this.formType === FormType.CREATE) {
            this.articleFormGroup.controls.resources.push(new FormGroup({
                key: new FormControl("", {nonNullable: true}),
                value: new FormControl("", {nonNullable: true})
            }))
        }
    }

    get resources() {
        return this.articleFormGroup.controls.resources.controls;
    }

    addResource() {
        this.articleFormGroup.controls.resources.push(new FormGroup({
            key: new FormControl("", {nonNullable: true}),
            value: new FormControl("", {nonNullable: true})
        }))
    }

    removeResource(index: number) {
        this.articleFormGroup.controls.resources.removeAt(index);
    }

    createArticle() {
        console.log(this.articleFormGroup.getRawValue())
        this.articlesApiService.create(this.articleFormGroup.getRawValue()).subscribe(() => {
            this.router.navigate([""]).then();
        })
    }
}
