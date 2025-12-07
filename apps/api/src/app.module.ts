import { ProfileModule } from '../profile/profile.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ProfileModule,
    ],
})
export class AppModule { }
