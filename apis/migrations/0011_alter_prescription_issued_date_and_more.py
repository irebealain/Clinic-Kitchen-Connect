# Generated by Django 5.1.2 on 2024-11-06 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0010_alter_user_managers_remove_prescription_date_given_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prescription',
            name='issued_date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='specialfood',
            name='description',
            field=models.CharField(max_length=250),
        ),
    ]