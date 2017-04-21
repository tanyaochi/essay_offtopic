# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-18 13:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('teacher', '0001_initial'),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='essay',
            name='teacher_id',
            field=models.ForeignKey(default=1995, on_delete=django.db.models.deletion.CASCADE, to='teacher.Teacher'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='teacher_id',
            field=models.ForeignKey(default=2015, on_delete=django.db.models.deletion.CASCADE, to='teacher.Teacher'),
            preserve_default=False,
        ),
    ]
