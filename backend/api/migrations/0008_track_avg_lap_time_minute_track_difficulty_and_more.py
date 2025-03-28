# Generated by Django 5.1.7 on 2025-03-19 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_name_car_make_car_cylinders_car_engine_size_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='avg_lap_time_minute',
            field=models.DecimalField(decimal_places=2, default=1.3, max_digits=4),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='track',
            name='difficulty',
            field=models.CharField(default='hard', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='track',
            name='distance_km',
            field=models.DecimalField(decimal_places=2, default=1.5, max_digits=4),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='track',
            name='model_asset_path',
            field=models.CharField(default='some/path/to/track'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='track',
            name='location',
            field=models.CharField(max_length=50),
        ),
    ]
