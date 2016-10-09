class HomeController < ApplicationController
    def index
        @points = MapPoint.all
    end

    def makePoint
        point = MapPoint.create(params.permit(:latitude, :longitude, :name))
        puts "CREATE POINT: #{point}"
    end

    def getPoints
        points = MapPoint.all
        respond_to do |format|
            format.html
            format.json {render json: {"points": points}}
        end
    end
end
