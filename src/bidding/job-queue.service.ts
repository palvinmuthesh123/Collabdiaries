import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entity/bid.entity'; // Replace with your actual entity

@Injectable()
export class JobQueueService implements OnModuleInit {
  private jobQueue: any[] = []; // Array to store jobs
  private isProcessing = false; // Flag to prevent concurrent processing

  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  // Add a job to the queue
  addJob(job: any): void {
    this.jobQueue.push(job);
    console.log('Job added to queue:', job);
  }

  // Process the next job in the queue
  private async processNextJob(): Promise<void> {
    if (this.isProcessing || this.jobQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    const job = this.jobQueue.shift(); // Get the next job
    console.log('Processing job:', job);

    try {
      // Save the job to the database
      await this.handleJob(job);
    } catch (error) {
      console.error('Error processing job:', error);
    } finally {
      this.isProcessing = false;

      // Continue processing the next job
      this.processNextJob();
    }
  }

  // Handle job logic (save to database)
  private async handleJob(job: any): Promise<void> {
    console.log('Handling job:', job);
    const bid = this.bidRepository.create(job); // Create the entity
    await this.bidRepository.save(bid); // Save it to the database
    console.log('Job saved successfully:', bid);
  }

  // Start processing jobs
  onModuleInit(): void {
    console.log('Starting job queue processing...');
    setInterval(() => this.processNextJob(), 1000); // Check queue every second
  }
}
