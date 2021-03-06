package model.appgen.repository

import model.appgen.service._
import scaldi.Module

// TODO: move file to a more appropriate location (it contains both repositories and services)

class AppgenRepositoryModule extends Module {
  binding to new UsersRepository
  binding to new UserService
  binding to new UserDataSourcesRepository
  binding to new UserPipelineDiscoveryRepository
  binding to new VisualizerService
  binding to new ApplicationsRepository
  binding to new ApplicationsService
  binding to new GoogleIdTokenVerifier
  binding to new DiscoveriesService
  binding to new CacheEntriesRepository
  binding to new ResultCacheService
  binding to new InstallService
}
