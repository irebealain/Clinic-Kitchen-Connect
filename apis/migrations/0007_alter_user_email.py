# Generated by Django 5.1.2 on 2024-10-26 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0006_alter_user_groups_alter_user_user_permissions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
