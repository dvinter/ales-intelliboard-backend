import { CampaignRepository } from './repositories/implementations/CampaignRepository';
import { CampaignUseCase } from '@/dashboard/package/Campaign/CampaignUseCase';
import { CampaignController } from '@/dashboard/package/Campaign/CampaignController';
import campaign from '@/common/entities/Campaign';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';

const campaignRepository = new CampaignRepository(campaign);

const campaignUseCase = new CampaignUseCase(campaignRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const campaignController = new CampaignController(
  campaignUseCase,
  responseResolverAdapter
);

export { campaignUseCase, campaignController };
