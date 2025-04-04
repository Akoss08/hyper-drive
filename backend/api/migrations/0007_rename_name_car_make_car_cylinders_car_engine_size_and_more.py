# Generated by Django 5.1.7 on 2025-03-19 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_booking_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='car',
            old_name='name',
            new_name='make',
        ),
        migrations.AddField(
            model_name='car',
            name='cylinders',
            field=models.PositiveIntegerField(default=4),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='engine_size',
            field=models.DecimalField(decimal_places=1, default=1.6, max_digits=3),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='horsepower',
            field=models.PositiveIntegerField(default=300),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='kph_from_zero_to_hundred',
            field=models.DecimalField(decimal_places=1, default=2.5, max_digits=4),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='model_asset_path',
            field=models.CharField(default='/path/to/default/model'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='top_speed',
            field=models.PositiveIntegerField(default=300),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='car',
            name='torque',
            field=models.PositiveIntegerField(default=400),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='car',
            name='year',
            field=models.PositiveIntegerField(),
        ),
    ]
