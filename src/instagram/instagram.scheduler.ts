import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InstagramService } from './instagram.service';
import { InjectRepository } from '@nestjs/typeorm';
import { InstagramToken } from './entities/instagram.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstagramScheduler {
  constructor(
    @InjectRepository(InstagramToken)
    private readonly instagramTokenRepository: Repository<InstagramToken>,
    private readonly instagramService: InstagramService,
  ) {}

  @Cron('0 0 * * *') // Run once a day at midnight
  async refreshTokens() {
    // Fetch all tokens from the database
    const tokens = await this.instagramTokenRepository.find();
    if (!tokens.length) {
      console.log('No tokens found to refresh');
      return;
    }
    // Iterate through the tokens
    for (const token of tokens) {
      try {
        const timeToExpire = token.expirationTime.getTime() - Date.now();
        // Check if the token will expire in the next 7 days
        if (timeToExpire < 7 * 24 * 60 * 60 * 1000) {
          console.log(`Refreshing token for user: ${token.userId}`);
          // Refresh the token using the InstagramService
          const refreshedToken = await this.instagramService.refreshAccessToken(
            token.accessToken,
          );
          // Save the refreshed token and new expiration time
          await this.instagramService.saveToken(
            refreshedToken.expirationTime,
            refreshedToken.refreshedToken,
            token.userId,
          );
          console.log(
            `Token refreshed for user: ${token.userId}. New expiration time: ${refreshedToken.expirationTime}`,
          );
        } else {
          console.log(
            `Token for user: ${token.userId} is valid and does not need refreshing`,
          );
        }
      } catch (error) {
        console.error(
          `Error refreshing token for user: ${token.userId}. Error: ${error.message}`,
        );
      }
    }
  }
}
