using playGroundWPF.Command;
using playGroundWPF.Model;
using playGroundWPF.services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive.Concurrency;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Threading;
using playGroundWPF.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System.Windows;

namespace playGroundWPF.ViewModel
{
    public class MainWindowViewModel : ViewModelBase
    {
        public IMovieService _movieService;

        public MainWindowViewModel(IMovieService movieService)
        {
            _movieService = movieService;
            handleSearchValues();
        }
        private bool _visibleLoader = false;

        public bool visibleLoader
        {
            get { return _visibleLoader; }
            set { SetProperty(ref _visibleLoader, value); }
        }
        private bool _visibleGrid = true;

        public bool visibleGrid
        {
            get { return _visibleGrid; }
            set { SetProperty(ref _visibleGrid, value); }
        }
        private void handleSearchValues()
        {
            var myScheduler = new SynchronizationContextScheduler(SynchronizationContext.Current);
            var ob = searchSubject.AsObservable()
                .Throttle(TimeSpan.FromMilliseconds(800))
                .DistinctUntilChanged()
            .Where(term => !string.IsNullOrWhiteSpace(term)&& term!=searchPlaceHolder).
                Do(x =>
                {
                    visibleLoader = true;
                    visibleGrid = false;
                })
            .SelectMany(getDataForValue).

            ObserveOn(myScheduler).SubscribeOn(Scheduler.NewThread)
            .Subscribe(data =>
            {
                this.movies = new ObservableCollection<movie>(data);
                visibleLoader = false;
                visibleGrid = true;
            });
        }

        public Action RequestClose { get; internal set; }
        const string searchPlaceHolder = "type here to search movie";
        private string _searchValue = searchPlaceHolder;
        private ObservableCollection<movie> _movies;

        private Subject<string> searchSubject = new Subject<string>();
        public ObservableCollection<movie> movies { get => _movies; set { SetProperty(ref _movies, value); } }

        public string SearchValue
        {
            get => _searchValue;
            set
            {

                SetProperty(ref _searchValue, value);


            }
        }

        private async Task<IEnumerable<movie>> getDataForValue(string value)
        {
            var moviesData = await _movieService.searchMovies(value);
            return moviesData;
        }

        private ICommand _focus;
        public ICommand focus => _focus ??= new RelayCommand(handleFocus);
        private ICommand _lostfocus;
        public ICommand lostfocus => _lostfocus ??= new RelayCommand(lostFocus);

        private ICommand _searchValueChanged;
        public ICommand searchValueChanged => _searchValueChanged ??= new RelayCommand(getDataForValueHandle);
        private void handleFocus(object param)
        {
            if (SearchValue == searchPlaceHolder)
            {
                SearchValue = String.Empty;
            }

        }
        private void lostFocus(object param)
        {
            if (_searchValue == string.Empty)
            {
                SearchValue = searchPlaceHolder;
            }
        }
        private void getDataForValueHandle(object param)
        {
            searchSubject.OnNext(SearchValue);

        }

    }
}
