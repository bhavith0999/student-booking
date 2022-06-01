import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { CourseModule } from './course/course.module';
import { LocationModule } from './location/location.module';
import { BookingModule } from './booking/booking.module';
import { TrainerModule } from './trainer/trainer.module';
import { StudentModule } from './student/student.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://booking:booking@cluster0.9psgeii.mongodb.net/booking?retryWrites=true&w=majority'), AuthModule, UsersModule, CourseModule, LocationModule, BookingModule, TrainerModule, StudentModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
