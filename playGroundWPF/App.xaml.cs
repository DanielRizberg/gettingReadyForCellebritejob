using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using playGroundWPF.Interfaces;
using playGroundWPF.services;
using playGroundWPF.View;
using playGroundWPF.ViewModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace playGroundWPF
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private ServiceProvider serviceProvider;
        public IConfiguration Configuration { get; private set; }
        public App()
        {
            initConfigurationServices();

            initDIcontainer();
        }

        private void initDIcontainer()
        {
            ServiceCollection services = new ServiceCollection();
            ConfigureServices(services);
            serviceProvider = services.BuildServiceProvider();
        }

        private void initConfigurationServices()
        {
            var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            Configuration = builder.Build();
        }

        private void ConfigureServices(ServiceCollection services)
        {
           
            services.AddSingleton(typeof(IMovieService), typeof(movieService));
            services.AddSingleton(pr => {
                var movieService = pr.GetService<IMovieService>();

                return new MainWindowViewModel(movieService);
            });
            services.AddSingleton<MainWindowView>(pr =>
            {
                var vm = pr.GetService<MainWindowViewModel>();
                return new MainWindowView(vm);
            });
        }

        protected override void OnStartup(StartupEventArgs e)
        {

            base.OnStartup(e); 

            MainWindowView window = serviceProvider.GetService<MainWindowView>();
            // Create the ViewModel to which 
            // the main window binds. 

            var viewModel = serviceProvider.GetService<MainWindowViewModel>();
            // When the ViewModel asks to be closed, 
            // close the window. 
            viewModel.RequestClose += delegate
            {
                window.Close(); 
            };
            // Allow all controls in the window to 
            // bind to the ViewModel by setting the 
            // DataContext, which propagates down 
            // the element tree. 
            window.DataContext = viewModel;
            window.Show();
        }
    }
}
