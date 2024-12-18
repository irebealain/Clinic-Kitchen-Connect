# Generated by Django 5.1.2 on 2024-10-26 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prescription',
            name='given_by',
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('ClinicStaff', 'Clinic Staff'), ('KitchenStaff', 'Kitchen Staff')], default='ClinicStaff', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='custom_user_set', to='auth.group'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='custom_user_permissions_set', to='auth.permission'),
        ),
    ]
